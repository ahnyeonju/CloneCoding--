package com.example.yanolza.model.entity;

import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@SequenceGenerator(
        name = "hostImg_seq",
        sequenceName = "hostImg_seq",
        initialValue = 1,
        allocationSize = 1
)
@Builder
@EntityListeners(AuditingEntityListener.class)
public class TbHostImg {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "hostImg_seq")
    private Integer id;
    private String originName;
    private Long fileSize;
    private String safeFile;

    @ManyToOne
    private TbHost tbHost;

}
