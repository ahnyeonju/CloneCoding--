package com.example.yanolza.service.img;

import com.example.yanolza.model.entity.TbHostImg;
import com.example.yanolza.model.entity.TbRoomImg;
import com.example.yanolza.model.network.Header;
import com.example.yanolza.model.network.request.TbHostImgRequest;
import com.example.yanolza.model.network.request.TbRoomImgRequest;
import com.example.yanolza.model.network.response.TbHostImgResponse;
import com.example.yanolza.model.network.response.TbRoomApiResponse;
import com.example.yanolza.model.network.response.TbRoomImgResponse;
import com.example.yanolza.repository.TbHostRepository;
import com.example.yanolza.repository.TbRoomImgRepository;
import com.example.yanolza.repository.TbRoomRepository;
import com.example.yanolza.service.BaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TbRoomImgService extends BaseService<TbRoomImgRequest, TbRoomImgResponse, TbRoomImg> {

    private final TbRoomRepository tbRoomRepository;
    private final TbRoomImgRepository tbRoomImgRepository;

    public String regist(TbRoomImgRequest request, MultipartHttpServletRequest multipartHttpServletRequest) {

        List<MultipartFile> fileList = multipartHttpServletRequest.getFiles("files");
        String path = "C://Users/dbgml/Desktop/1013/src/main/resources/static/img/roomimage//";
        for (MultipartFile multipartFile : fileList) {
            if (multipartFile.getSize() > 0) {
                String originName = multipartFile.getOriginalFilename();
                long fileSize = multipartFile.getSize();
                UUID uuid = UUID.randomUUID();
                originName = uuid + "_" + originName;
                String safeFile = path + originName;
                TbRoomImg tbRoomImg = TbRoomImg.builder()
                        .originName(originName)
                        .fileSize(fileSize)
                        .safeFile(safeFile)     // 로컬경로
                        .tbRoom(tbRoomRepository.getById(request.getTbRoomId()))
                        .build();
                    baseRepository.save(tbRoomImg);    // db에 저장
                try {
                    multipartFile.transferTo(new File(safeFile));
                }catch (IllegalStateException e){
                    e.printStackTrace();
                }catch (IOException e){
                    e.printStackTrace();
                }
            }
        }
        return "파일첨부완료"; // header에 담고싶긴한ㄷ,,,
    }
    // img // (Admin)
    public List<TbRoomImgRequest> getRimgList(Integer tbRoomId){
        List<TbRoomImg> tbRoomImgs = tbRoomImgRepository.findAllByTbRoomId(tbRoomId);
        List<TbRoomImgRequest> tbRoomImgRequestList = new ArrayList<>();
        for (TbRoomImg tbRoomImg: tbRoomImgs){
            TbRoomImgRequest tbRoomImgRequest = TbRoomImgRequest.builder()
                    .id(tbRoomImg.getId())
                    .originName(tbRoomImg.getOriginName())
                    .fileSize(tbRoomImg.getFileSize())
                    .safeFile(tbRoomImg.getSafeFile())
                    .build();
            tbRoomImgRequestList.add(tbRoomImgRequest);
        }
        return tbRoomImgRequestList;
    }


    public TbRoomImgResponse response(TbRoomImg tbRoomImg){
        TbRoomImgResponse tbRoomImgResponse = TbRoomImgResponse.builder()
                .id(tbRoomImg.getId())
                .originName(tbRoomImg.getOriginName())
                .fileSize(tbRoomImg.getFileSize())
                .safeFile(tbRoomImg.getSafeFile())
                .build();
        return tbRoomImgResponse;
    }

    @Override
    public Header<TbRoomImgResponse> create(Header<TbRoomImgRequest> request) {
        return null;
    }
    @Override
    public Header<TbRoomImgResponse> read(Integer id) {
        return null;
    }
    @Override
    public Header<TbRoomImgResponse> update(Header<TbRoomImgRequest> request) {
        return null;
    }
    @Override
    public Header<TbRoomImgResponse> delete(Integer id) {
        return null;
    }
}
