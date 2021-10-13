package com.example.yanolza.model.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@SequenceGenerator(
        name = "question_seq",
        sequenceName = "question_seq",
        initialValue = 1,
        allocationSize = 1
)
@Builder
@EntityListeners(AuditingEntityListener.class)
public class TbQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "question_seq")
    private Integer id;
    private String qCategory;
    private String qType;
    private String qName;
    private String qHp;
    private String qEmail;
    private String qContent;
    @CreatedDate
    private LocalDateTime qRegdate;
    @CreatedDate    // 수정시 쿼리문에 이것만 넣어서 다시..?
    private LocalDateTime qAdate;
    private String qAnswer;
    private String qIscheck;

    @ManyToOne
    private TbMem tbMem;


}
