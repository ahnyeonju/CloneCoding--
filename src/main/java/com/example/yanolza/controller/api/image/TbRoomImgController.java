package com.example.yanolza.controller.api.image;

import com.example.yanolza.controller.CrudController;
import com.example.yanolza.model.entity.TbRoomImg;
import com.example.yanolza.model.network.request.TbRoomImgRequest;
import com.example.yanolza.model.network.response.TbRoomImgResponse;
import com.example.yanolza.service.img.TbRoomImgService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;


@RestController
@RequestMapping("/room")
@RequiredArgsConstructor
public class TbRoomImgController extends CrudController<TbRoomImgRequest, TbRoomImgResponse, TbRoomImg> {
    private final TbRoomImgService tbRoomImgService;

    @PostMapping("/img")
    public String hregist(@RequestPart(value = "data", required = false) TbRoomImgRequest request, MultipartHttpServletRequest multipartHttpServletRequest)throws Exception {
        return tbRoomImgService.regist(request, multipartHttpServletRequest);
    }

    @GetMapping("/imglist/{tbRoomId}")  // (Admin)
    public List<TbRoomImgRequest> imgList(@PathVariable(name = "tbRoomId")Integer tbRoomId){
        return tbRoomImgService.getRimgList(tbRoomId);
    }

}