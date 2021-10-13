package com.example.yanolza.repository;

import com.example.yanolza.model.entity.TbMem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface  TbMemRepository extends JpaRepository<TbMem, Integer> {
    Optional<TbMem> findById(Integer id);
    String getByMemNkname(String memNkname);
    Optional<TbMem> findByMemEmail(String memEmail);
    TbMem getByMemEmail(String memEmail);
    List<TbMem>getAllByMemEmail(String memEmail);
}
