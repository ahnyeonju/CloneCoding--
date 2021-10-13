package com.example.yanolza.model.network.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TbZzimApiRequest {
    private Integer id;
    private String zzName;
    private String zzPic;
    private Integer tbMemId;
    private Integer tbHostId;
}
