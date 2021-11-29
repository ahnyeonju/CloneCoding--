package com.example.yanolza.service.img;

import com.example.yanolza.model.entity.TbReviewImg;
import com.example.yanolza.model.network.Header;
import com.example.yanolza.model.network.request.TbReviewImgRequest;
import com.example.yanolza.model.network.response.TbReviewImgResoponse;
import com.example.yanolza.repository.TbReviewImgRepository;
import com.example.yanolza.repository.TbReviewRepository;
import com.example.yanolza.service.BaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TbReviewImgService extends BaseService<TbReviewImgRequest, TbReviewImgResoponse, TbReviewImg> {

    private final TbReviewRepository tbReviewRepository;
    private final TbReviewImgRepository tbReviewImgRepository;

    // review image 등록
    public Header<TbReviewImgResoponse> review(String originName, Long fileSize, String safeFile, Integer id) {
        TbReviewImg tbReviewImg = TbReviewImg.builder()
                .originName(originName)
                .fileSize(fileSize)
                .safeFile(safeFile)
                .tbReview(tbReviewRepository.getById(id))
                .build();
        TbReviewImg newReviewImg = baseRepository.save(tbReviewImg);
        return Header.OK(resoponse(newReviewImg));

    }
    //img// (admin)
    public List<TbReviewImgRequest> getRevImg(Integer tbReviewId){
        List<TbReviewImg> tbReviewImgList = tbReviewImgRepository.findAllByTbReviewId(tbReviewId);
        List<TbReviewImgRequest> tbReviewImgRequestList = new ArrayList<>();
        for (TbReviewImg tbReviewImg : tbReviewImgList){
            TbReviewImgRequest tbRoomImgRequest = TbReviewImgRequest.builder()
                    .id(tbReviewImg.getId())
                    .originName(tbReviewImg.getOriginName())
                    .fileSize(tbReviewImg.getFileSize())
                    .safeFile(tbReviewImg.getSafeFile())
                    .build();
            tbReviewImgRequestList.add(tbRoomImgRequest);
        }
        return tbReviewImgRequestList;
    }

    // 수정
    // tb_host_img의 id값 가져와서 경로 ? 파일이름 바꿔주는거 VS 그냥 원래있던거 삭제하고 새로 등록
    public String update(Integer id, TbReviewImgRequest request, MultipartHttpServletRequest multipartHttpServletRequest) {
        //id값 받아와서 delete하기?
        Optional<TbReviewImg> optional = tbReviewImgRepository.findById(id);
        optional.map(tbReviewImg -> {
            tbReviewImgRepository.delete(tbReviewImg);
            return Header.OK();
        }).orElseGet(()-> Header.Error("데이터 없음!"));

        List<MultipartFile> fileList = multipartHttpServletRequest.getFiles("files");
        String path = "C:/Users/user/Desktop/20211026/src/main/resources/static/img/reviewImg//";

        for (MultipartFile multipartFile : fileList) {
            if (multipartFile.getSize() > 0) {
                String originName = multipartFile.getOriginalFilename();
                long fileSize = multipartFile.getSize();
                UUID uuid = UUID.randomUUID();
                originName = uuid + "_" + originName;
                String safeFile = path + originName;
                TbReviewImg tbReviewImg = TbReviewImg.builder()
                        .originName(originName)
                        .fileSize(fileSize)
                        .safeFile(safeFile)
                        .tbReview(tbReviewRepository.getById(request.getTbReviewId()))
                        .build();
                baseRepository.save(tbReviewImg);

                try {
                    multipartFile.transferTo(new File(safeFile));
                }catch (IllegalStateException e){
                    e.printStackTrace();
                }catch (IOException e){
                    e.printStackTrace();
                }

            }
        }
        return "파일수정완료";
    }


    // 삭제
    public String imgdelete(Integer id){
        //id값 받아와서 delete하기?
        Optional<TbReviewImg> optional = tbReviewImgRepository.findById(id);
        optional.map(tbHostImg -> {
            tbReviewImgRepository.delete(tbHostImg);
            return Header.OK();
        }).orElseGet(()-> Header.Error("데이터 없음!"));

        return "파일 삭제 완료";
    }



    public TbReviewImgResoponse resoponse(TbReviewImg tbReviewImg){
        TbReviewImgResoponse tbReviewImgResoponse = TbReviewImgResoponse.builder()
                .id(tbReviewImg.getId())
                .originName(tbReviewImg.getOriginName())
                .fileSize(tbReviewImg.getFileSize())
                .safeFile(tbReviewImg.getSafeFile())
                .build();
        return tbReviewImgResoponse;
    }

    @Override
    public Header<TbReviewImgResoponse> create(Header<TbReviewImgRequest> request) {
        return null;
    }

    @Override
    public Header<TbReviewImgResoponse> read(Integer id) {
        return null;
    }

    @Override
    public Header<TbReviewImgResoponse> update(Header<TbReviewImgRequest> request) {
        return null;
    }

    @Override
    public Header<TbReviewImgResoponse> delete(Integer id) {
        return null;
    }
}
