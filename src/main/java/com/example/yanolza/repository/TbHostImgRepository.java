package com.example.yanolza.repository;

import com.example.yanolza.model.entity.TbHostImg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TbHostImgRepository extends JpaRepository<TbHostImg, Integer> {
    List<TbHostImg> findAllByTbHostId(Integer tbHostId);    //와이게되네 개꿀 Entity
}
