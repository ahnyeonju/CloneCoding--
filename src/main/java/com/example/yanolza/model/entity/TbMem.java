package com.example.yanolza.model.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SequenceGenerator(
        name="member_seq",
        sequenceName = "member_seq",
        initialValue = 1,
        allocationSize = 1
)
@Builder
@EntityListeners(AuditingEntityListener.class)
public class TbMem {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "member_seq")
    private Integer id;
    private String memHp;
    private String memEmail;
    private String memPw;
    private String memNkname;
    private Integer memPoint;
    @CreatedDate
    private LocalDateTime memRegdate;

    @Enumerated(EnumType.STRING)
    private TbMemRole role;


    @OneToMany(fetch = FetchType.LAZY, mappedBy = "tbMem")
    private List<TbHost> TbHostList;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "tbMem")
    private List<TbReview> tbReviewList;

    @OneToMany (fetch = FetchType.LAZY, mappedBy = "tbMem")
    private List<TbPay> tbPayList;

    @OneToMany (fetch = FetchType.LAZY, mappedBy = "tbMem")
    private List<TbQuestion> tbQuestionList;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "tbMem")
    private List<TbZzim> tbZzimList;


}
