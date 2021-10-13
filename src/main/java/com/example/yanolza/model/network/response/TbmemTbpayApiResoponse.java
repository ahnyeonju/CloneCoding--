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
public class TbmemTbpayApiResoponse {
    private TbMemApiResponse tbMemApiResponse;
}
