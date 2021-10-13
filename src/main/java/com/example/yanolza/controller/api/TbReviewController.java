package com.example.yanolza.controller.api;

import com.example.yanolza.controller.CrudController;
import com.example.yanolza.model.entity.TbReview;
import com.example.yanolza.model.network.Header;
import com.example.yanolza.model.network.request.TbReviewApiRequest;
import com.example.yanolza.model.network.response.TbMemApiResponse;
import com.example.yanolza.model.network.response.TbReviewApiResponse;
import com.example.yanolza.service.TbReviewApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/review")
@RequiredArgsConstructor
public class TbReviewController extends CrudController<TbReviewApiRequest, TbReviewApiResponse, TbReview> {
    private final TbReviewApiService tbReviewApiService;

    //리뷰 작성 ok
    @PostMapping("/write")
    public Header<TbReviewApiResponse> rwrite(@RequestBody Header<TbReviewApiRequest> request){
        System.out.println(request);
        return tbReviewApiService.writer(request);
    }
    // 리뷰리스트 ok (admin) (host)
    @GetMapping("/list")
    public List<TbReviewApiRequest> Reviewlist(){
        return tbReviewApiService.getReList();
    }

    // 리뷰리스트 (미답변) (host) ok
    @GetMapping("/milist")
    public List<TbReviewApiRequest> miReviewlist(){
        return tbReviewApiService.getmiReList();
    }

    //리뷰 디테일    (admin)
    @GetMapping("/list/{id}")
    public Header<TbReviewApiResponse> rdetail(@PathVariable(name = "id")Integer id){
        return tbReviewApiService.getrdetail(id);
    }
    //리뷰삭제 ok   (admin)
    @DeleteMapping("/list/{id}")
    public Header<TbReviewApiResponse> delrev(@PathVariable(name = "id")Integer id){
        return tbReviewApiService.revdel(id);
    }
    //사장님 댓글 등록 y로 자동변환.
    @PatchMapping("/re/{id}")
    public Header<TbReviewApiResponse> update(@RequestBody Header<TbReviewApiRequest> request){
        return tbReviewApiService.updatere(request);
    }
    //사장님 댓글 등록 수정정
    @PatchMapping("/reply/{id}")
    public Header<TbReviewApiResponse> updater(@RequestBody Header<TbReviewApiRequest> request){
        return tbReviewApiService.rereupdate(request);
    }
}