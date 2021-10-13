package com.example.yanolza.model.network.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TbQuestionApiResponse {
    private Integer id;
    private String qCategory;
    private String qType;
    private String qName;
    private String qHp;
    private String qEmail;
    private String qContent;
    private LocalDateTime qRegdate;
    private LocalDateTime qAdate;
    private String qAnswer;
    private String qIscheck;
    private Integer tbMemId;
}
