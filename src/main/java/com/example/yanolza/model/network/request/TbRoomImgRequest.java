package com.example.yanolza.model.network.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TbRoomImgRequest {
    private Integer id;
    private String originName;
    private Long fileSize;
    private String safeFile;
    private Integer tbRoomId;

}
