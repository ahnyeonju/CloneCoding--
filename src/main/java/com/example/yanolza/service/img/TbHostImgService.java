package com.example.yanolza.service.img;

import com.example.yanolza.model.entity.TbHostImg;
import com.example.yanolza.model.entity.TbRoomImg;
import com.example.yanolza.model.network.Header;
import com.example.yanolza.model.network.request.TbHostImgRequest;
import com.example.yanolza.model.network.request.TbRoomImgRequest;
import com.example.yanolza.model.network.response.TbHostImgResponse;
import com.example.yanolza.repository.TbHostImgRepository;
import com.example.yanolza.repository.TbHostRepository;
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
public class TbHostImgService extends BaseService<TbHostImgRequest, TbHostImgResponse, TbHostImg> {

    private final TbHostRepository tbHostRepository;
    private final TbHostImgRepository tbHostImgRepository;

    public String regist(TbHostImgRequest request, MultipartHttpServletRequest multipartHttpServletRequest) {
        List<MultipartFile> fileList = multipartHttpServletRequest.getFiles("files");
        String path = "C://Users/dbgml/Desktop/1013/src/main/resources/static/img/hostimage//";
        for (MultipartFile multipartFile : fileList) {
            if (multipartFile.getSize() > 0) {
                String originName = multipartFile.getOriginalFilename();
                long fileSize = multipartFile.getSize();
                UUID uuid = UUID.randomUUID();
                originName = uuid + "_" + originName;
                String safeFile = path + originName;
                TbHostImg tbHostImg = TbHostImg.builder()
                        .originName(originName)
                        .fileSize(fileSize)
                        .safeFile(safeFile)
                        .tbHost(tbHostRepository.getById(request.getTbHostId()))
                        .build();
                     baseRepository.save(tbHostImg);
                try {
                    multipartFile.transferTo(new File(safeFile));
                }catch (IllegalStateException e){
                    e.printStackTrace();
                }catch (IOException e){
                    e.printStackTrace();
                }

            }
        }
                return "파일첨부완료";
    }
    // (Admin)
    public List<TbHostImgRequest> gethpiclist(Integer tbHostId){
        List<TbHostImg> tbHostImgs = tbHostImgRepository.findAllByTbHostId(tbHostId);
        List<TbHostImgRequest> tbHostImgRequestList = new ArrayList<>();

        for (TbHostImg tbHostImg: tbHostImgs){
            TbHostImgRequest tbHostImgRequest = TbHostImgRequest.builder()
                    .id(tbHostImg.getId())
                    .originName(tbHostImg.getOriginName())
                    .fileSize(tbHostImg.getFileSize())
                    .safeFile(tbHostImg.getSafeFile())
                    .build();
            tbHostImgRequestList.add(tbHostImgRequest);
        }
        return tbHostImgRequestList;
    }


    public TbHostImgResponse response(TbHostImg tbHostImg){
        TbHostImgResponse tbHostImgResponse = TbHostImgResponse.builder()
                .id(tbHostImg.getId())
                .originName(tbHostImg.getOriginName())
                .fileSize(tbHostImg.getFileSize())
                .safeFile(tbHostImg.getSafeFile())
                .build();
        return tbHostImgResponse;
    }


    @Override
    public Header<TbHostImgResponse> create(Header<TbHostImgRequest> request) {
        return null;
    }
    @Override
    public Header<TbHostImgResponse> read(Integer id) {
        return null;
    }
    @Override
    public Header<TbHostImgResponse> update(Header<TbHostImgRequest> request) {
        return null;
    }
    @Override
    public Header<TbHostImgResponse> delete(Integer id) {
        return null;
    }
}
