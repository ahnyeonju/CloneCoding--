package com.example.yanolza.repository;

import com.example.yanolza.model.entity.TbPay;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface TbPayRepository extends JpaRepository<TbPay, Integer> {
    List<TbPay> findAllById(Integer id);
    List<TbPay> findAll(Sort sort);
    List<TbPay> findAllByPayCancel(Sort sort, String payCancel);
}
