package com.example.yanolza.controller.api.image;

import com.example.yanolza.controller.CrudController;
import com.example.yanolza.model.entity.TbReview;
import com.example.yanolza.model.entity.TbReviewImg;
import com.example.yanolza.model.network.request.TbHostImgRequest;
import com.example.yanolza.model.network.request.TbReviewApiRequest;
import com.example.yanolza.model.network.request.TbReviewImgRequest;
import com.example.yanolza.model.network.response.TbReviewImgResoponse;
import com.example.yanolza.service.TbReviewApiService;
import com.example.yanolza.service.img.TbReviewImgService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;

@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
public class TbReviewImgController extends CrudController<TbReviewImgRequest, TbReviewImgResoponse, TbReview> {
    private final TbReviewApiService tbReviewApiService;
    private final TbReviewImgService tbReviewImgService;


    //review 이미지 등록
    @PostMapping("/img")
    public String hregist(@RequestPart(value = "info", required = false) TbReviewImgRequest request, MultipartHttpServletRequest multi)throws Exception {
        return tbReviewImgService.review(request, multi);
    }

    //이미지 불러오기 (admin)
    @GetMapping("/imgList/{tbReviewId}")
    public List<TbReviewImgRequest> RevImg(@PathVariable(name = "tbReviewId")Integer tbReviewId){
        return tbReviewImgService.getRevImg(tbReviewId);
    }
}
