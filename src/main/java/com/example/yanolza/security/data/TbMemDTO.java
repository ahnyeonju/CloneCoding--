package com.example.yanolza.security.data;


import com.example.yanolza.model.entity.TbMem;
import com.example.yanolza.model.entity.TbMemRole;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TbMemDTO {
    private String memHp;
    private String memEmail;
    private String memPw;
    private String memNkname;
    private Integer memPoint;
    private TbMemRole role;

    @Builder
    public TbMemDTO( String memHp, String memEmail, String memPw, String memNkname, Integer memPoint,TbMemRole role) {
        this.memHp = memHp;
        this.memEmail = memEmail;
        this.memPw = memPw;
        this.memNkname = memNkname;
        this.memPoint = memPoint;
        this.role = role;
    }
    public TbMem toEntity() {
        return TbMem.builder()
                .memHp(memHp)
                .memEmail(memEmail)
                .memPw(memPw)
                .memNkname(memNkname)
                .memPoint(memPoint)
                .role(role)
                .build();

    }
}
