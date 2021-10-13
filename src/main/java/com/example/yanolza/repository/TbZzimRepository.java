package com.example.yanolza.repository;

import com.example.yanolza.model.entity.TbPay;
import com.example.yanolza.model.entity.TbZzim;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TbZzimRepository extends JpaRepository<TbZzim, Integer> {
    List<TbZzim> findAllById(Integer id);
    Optional<TbZzim> findById (Integer id);
}
