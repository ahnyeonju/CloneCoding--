package com.example.yanolza.controller.api;

import com.example.yanolza.controller.CrudController;
import com.example.yanolza.model.entity.TbRoom;
import com.example.yanolza.model.network.Header;
import com.example.yanolza.model.network.request.TbRoomApiRequest;
import com.example.yanolza.model.network.response.TbRoomApiResponse;
import com.example.yanolza.service.TbRoomApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/room")
@RequiredArgsConstructor
public class TbRoomController extends CrudController<TbRoomApiRequest, TbRoomApiResponse, TbRoom> {
    private final TbRoomApiService tbRoomApiService;

//    객실등록 ok
    @PostMapping("/regr")
    public Header<TbRoomApiResponse> roo(@RequestBody Header<TbRoomApiRequest> request){
        System.out.println(request);
        return tbRoomApiService.regr(request);
    }

    //객실리스트 ok
    @GetMapping("/rrist")
    public List<TbRoomApiRequest> rlist(){
        return tbRoomApiService.getrlist();
    }
    //

    //객실 디테일?
    @GetMapping("/rrlist/{id}")
    public Header<TbRoomApiResponse> getRoom(@PathVariable(name = "id")Integer id){
        return tbRoomApiService.roomget(id);
    }

    //객실 정보 수정 id 랑 호스트아이디 넣어줘야함
    @PutMapping("/rrlist/{id}")
    public Header<TbRoomApiResponse> rupdate(@RequestBody Header<TbRoomApiRequest> request){
        return tbRoomApiService.updater(request);
    }


    //객실 삭제 ok
    @DeleteMapping("/rrlist/{id}")
    public Header<TbRoomApiResponse> delroom(@PathVariable(name = "id")Integer id){
        return tbRoomApiService.roomdel(id);
    }



}

