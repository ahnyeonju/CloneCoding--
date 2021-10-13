package com.example.yanolza.model.network.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TbNknameApiRequest {
    private Integer id;
    private String rnFname;
    private String rnLname;
}
