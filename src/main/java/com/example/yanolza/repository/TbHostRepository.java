package com.example.yanolza.repository;

import com.example.yanolza.model.entity.TbHost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TbHostRepository extends JpaRepository< TbHost,Integer> {
    List<TbHost> findAllByPkAdmit(String pkAdmit);
    Optional<TbHost> findByPkAdmitAndId(String  pkAdmit , Integer id);  // 하이거 맞나 18
    Optional<TbHost> findById(Integer id);
    List<TbHost> findAllByPkAdmitAndMyType(String pkAdmit, String myType);
    String getByMyCorporate(String myCorporate);


//    TbHost getById();
}
