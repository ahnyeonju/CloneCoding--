package com.example.yanolza.model.network.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TbRoomImgResponse {
    private Integer id;
    private String originName;
    private Long fileSize;
    private String safeFile;
    private Integer tbRoomId;
}
