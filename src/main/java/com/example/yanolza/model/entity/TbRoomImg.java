package com.example.yanolza.model.entity;

import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@SequenceGenerator(
        name = "room_img_seq",
        sequenceName = "room_img_seq",
        initialValue = 1,
        allocationSize = 1
)
@Builder
@EntityListeners(AuditingEntityListener.class)
public class TbRoomImg {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "room_img_seq")
    private Integer id;
    private String originName;
    private Long fileSize;
    private String safeFile;

    @ManyToOne
    private TbRoom tbRoom;
}
