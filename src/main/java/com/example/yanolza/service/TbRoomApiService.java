package com.example.yanolza.service;

import com.example.yanolza.model.entity.TbRoom;
import com.example.yanolza.model.network.Header;
import com.example.yanolza.model.network.request.TbRoomApiRequest;
import com.example.yanolza.model.network.response.TbRoomApiResponse;
import com.example.yanolza.repository.TbHostRepository;
import com.example.yanolza.repository.TbRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TbRoomApiService extends BaseService<TbRoomApiRequest, TbRoomApiResponse, TbRoom> {
    @Autowired
    private final TbHostRepository tbHostRepository;
    @Autowired
    private final TbRoomRepository tbRoomRepository;


    //객실 등록
    public Header<TbRoomApiResponse> regr(Header<TbRoomApiRequest> request){
        TbRoomApiRequest tbRoomApiRequest = request.getData();
        TbRoom tbRoom = TbRoom.builder()
                .myStime(tbRoomApiRequest.getMyStime())
                .myCtime(tbRoomApiRequest.getMyCtime())
                .rmName(tbRoomApiRequest.getRmName())
                .rmType(tbRoomApiRequest.getRmType())
                .rmNumber(tbRoomApiRequest.getRmNumber())
                .rmIntro(tbRoomApiRequest.getRmIntro())
                .rmService(tbRoomApiRequest.getRmService())
                .prSdate(tbRoomApiRequest.getPrSdate())
                .prSprice(tbRoomApiRequest.getPrSprice())
                .prDate(tbRoomApiRequest.getPrDate())
                .prPrice(tbRoomApiRequest.getPrPrice())
                .tbHost(tbHostRepository.getById(tbRoomApiRequest.getTbHostId()))
                .build();
        TbRoom newRoom = baseRepository.save(tbRoom);
        return Header.OK(response(newRoom));

    }

    // 객실 리스트
    public List<TbRoomApiRequest> getrlist(){
        List<TbRoom> tbRooms = tbRoomRepository.findAll();
        List<TbRoomApiRequest> tbRoomApiRequestList = new ArrayList<>();
        for (TbRoom tbRoom : tbRooms){
            TbRoomApiRequest tbRoomApiRequest = TbRoomApiRequest.builder()
                    .id(tbRoom.getId())
                    .myStime(tbRoom.getMyStime())
                    .myCtime(tbRoom.getMyCtime())
                    .rmName(tbRoom.getRmName())
                    .rmType(tbRoom.getRmType())
                    .rmNumber(tbRoom.getRmNumber())
                    .rmIntro(tbRoom.getRmIntro())
                    .rmService(tbRoom.getRmService())
                    .prSdate(tbRoom.getPrSdate())
                    .prSprice(tbRoom.getPrSprice())
                    .prDate(tbRoom.getPrDate())
                    .prPrice(tbRoom.getPrPrice())
                    .tbHostId(tbRoom.getTbHost().getId())
                    .build();
            tbRoomApiRequestList.add(tbRoomApiRequest);
        }
        return tbRoomApiRequestList;
    }


    //객실디테일
    public Header<TbRoomApiResponse> roomget(Integer id){
        return tbRoomRepository.findByid(id)
                .map(tbRoom -> response(tbRoom))
                .map(Header::OK)
                .orElseGet(
                        ()-> Header.Error("꺼져")
                );
    }

    //객실수정
    public Header<TbRoomApiResponse> updater(Header<TbRoomApiRequest> request){
        TbRoomApiRequest tbRoomApiRequest = request.getData();
        Optional<TbRoom> optional = baseRepository.findById(tbRoomApiRequest.getId());
        return optional.map(tbRoom -> {
            tbRoom.setMyStime(tbRoomApiRequest.getMyStime());
            tbRoom.setMyCtime(tbRoomApiRequest.getMyCtime());
            tbRoom.setRmName(tbRoomApiRequest.getRmName());
            tbRoom.setRmType(tbRoomApiRequest.getRmType());
            tbRoom.setRmNumber(tbRoomApiRequest.getRmNumber());
            tbRoom.setRmIntro(tbRoomApiRequest.getRmIntro());
            tbRoom.setRmService(tbRoomApiRequest.getRmService());
            tbRoom.setPrSdate(tbRoomApiRequest.getPrSdate());
            tbRoom.setPrSprice(tbRoomApiRequest.getPrSprice());
            tbRoom.setPrDate(tbRoomApiRequest.getPrDate());
            tbRoom.setPrPrice(tbRoomApiRequest.getPrPrice());
            return tbRoom;
        }).map(tbRoom -> baseRepository.save(tbRoom))
                .map(tbRoom -> response(tbRoom))
                .map(Header::OK)
                .orElseGet(()-> Header.Error("에러다임마"));
    }

    // 객실 삭제
    public Header roomdel(Integer id){
        Optional<TbRoom> optional = baseRepository.findById(id);
        return optional.map(tbRoom -> {
            baseRepository.delete(tbRoom);
            return Header.OK();
        }).orElseGet(()->Header.Error("없어임마"));
    }

    //response
    public TbRoomApiResponse response(TbRoom tbRoom) {
        TbRoomApiResponse tbRoomApiResponse = TbRoomApiResponse.builder()
                .id(tbRoom.getId())
                .myStime(tbRoom.getMyStime())
                .myCtime(tbRoom.getMyCtime())
                .rmName(tbRoom.getRmName())
                .rmType(tbRoom.getRmType())
                .rmNumber(tbRoom.getRmNumber())
                .rmIntro(tbRoom.getRmIntro())
                .rmService(tbRoom.getRmService())
                .prSdate(tbRoom.getPrSdate())
                .prSprice(tbRoom.getPrSprice())
                .prDate(tbRoom.getPrDate())
                .prPrice(tbRoom.getPrPrice())
                .tbHostId(tbRoom.getTbHost().getId())
                .build();
        return tbRoomApiResponse;
    }



//    //객실 정보수정
//    @Transactional
//    public void roomupdate(Integer id, TbRoomDTO tbRoomDTO){
//        Optional<TbRoom> tbRoom = tbRoomRepository.findById(id);
//        tbRoom.ifPresent(select->{
//            select.setRmName(tbRoomDTO.getRmName());
//            select.setRmType(tbRoomDTO.getRmType());
//            select.setRmNumber(tbRoomDTO.getRmNumber());
//            select.setRmImage(tbRoomDTO.getRmImage());
//            select.setRmIntro(tbRoomDTO.getRmIntro());
//            select.setRmService(tbRoomDTO.getRmService());
//            select.setPr_sdate(tbRoomDTO.getPr_sdate());
//            select.setPr_sprice(tbRoomDTO.getPr_sprice());
//            select.setPr_date(tbRoomDTO.getPr_date());
//            select.setPr_price(tbRoomDTO.getPr_price());


    @Override
    public Header<TbRoomApiResponse> create(Header<TbRoomApiRequest> request) {
        return null;
    }

    @Override
    public Header<TbRoomApiResponse> read(Integer id) {
        return null;
    }

    @Override
    public Header<TbRoomApiResponse> update(Header<TbRoomApiRequest> request) {
        return null;
    }

    @Override
    public Header<TbRoomApiResponse> delete(Integer id) {
        return null;
    }
}
