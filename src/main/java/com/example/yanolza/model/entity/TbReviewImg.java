package com.example.yanolza.model.entity;

import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@SequenceGenerator(
        name = "review_img_seq",
        sequenceName = "review_img_seq",
        initialValue = 1,
        allocationSize = 1
)
@Builder
@EntityListeners(AuditingEntityListener.class)
public class TbReviewImg {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "review_img_seq")
    private Integer id;
    private String originName;
    private Long fileSize;
    private String safeFile;


    @ManyToOne
    private TbReview tbReview;
}
