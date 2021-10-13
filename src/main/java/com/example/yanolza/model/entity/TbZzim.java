package com.example.yanolza.model.entity;


import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@SequenceGenerator(
        name = "zzim_seq",
        sequenceName = "zzim_seq",
        initialValue = 1,
        allocationSize = 1
)

@Builder
@EntityListeners(AuditingEntityListener.class)
public class TbZzim {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "zzim_seq")
    private Integer id;
    private String zzName;
    private String zzPic;
    @ManyToOne
    private TbHost tbHost;  // 숙박용
    @ManyToOne
    private TbMem tbMem;
}
