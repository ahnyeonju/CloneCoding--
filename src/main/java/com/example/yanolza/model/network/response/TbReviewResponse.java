package com.example.yanolza.model.network.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TbReviewResponse {
    private TbMemApiResponse tbMemApiResponse;
    private Integer id;
    private String reNkname;
    private char reGrade;   // 별점 고려중;
    private String reTitle;
    private String reContent;
    private String reImg;
    private String reReply;
}
