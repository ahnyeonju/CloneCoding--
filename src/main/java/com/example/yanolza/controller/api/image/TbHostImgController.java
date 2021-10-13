package com.example.yanolza.controller.api.image;

import com.example.yanolza.controller.CrudController;
import com.example.yanolza.model.entity.TbHostImg;
import com.example.yanolza.model.network.request.TbHostImgRequest;
import com.example.yanolza.model.network.response.TbHostImgResponse;
import com.example.yanolza.service.img.TbHostImgService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;

@RestController
@RequestMapping("/host")
@RequiredArgsConstructor
public class TbHostImgController extends CrudController<TbHostImgRequest, TbHostImgResponse, TbHostImg> {
    private final TbHostImgService tbHostImgService;

    @PostMapping("/img")
    public String hregist(@RequestPart(value = "info", required = false) TbHostImgRequest request, MultipartHttpServletRequest multipartHttpServletRequest)throws Exception {
        return tbHostImgService.regist(request, multipartHttpServletRequest);
    }
    @GetMapping("/himglist/{tbHostId}") // (Admin)
    public List<TbHostImgRequest> imglist(@PathVariable(name = "tbHostId")Integer tbHostId){
        return tbHostImgService.gethpiclist(tbHostId);
    }
}
