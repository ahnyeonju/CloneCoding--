package com.example.yanolza.model.network.response;

import com.example.yanolza.model.entity.TbPay;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TbMemApiResponse {
    private Integer id;
    private String memHp;
    private String memEmail;
    private String memPw;
    private String memNkname;
    private Integer memPoint;
    private LocalDateTime memRegdate;

    private List<TbHostApiResponse> tbHostApiResponseList;
    private List<TbReviewApiResponse> tbReviewApiResponseList;
    private List<TbPayApiResponse> tbPayApiResponseList;
    private List<TbQuestionApiResponse> tbQuestionApiResponseList;
    private List<TbZzimApiResponse> tbZzimApiResponseList;
    private List<TbPay> tbPayList;
}
