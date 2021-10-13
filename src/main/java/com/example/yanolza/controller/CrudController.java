package com.example.yanolza.controller;

import com.example.yanolza.Ifs.CrudInterface;
import com.example.yanolza.model.network.Header;
import com.example.yanolza.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

@Component  // 이건 component로 쓸거임!
public abstract class CrudController<Req, Res, Entity>implements CrudInterface<Req, Res> {

    @Autowired(required = false)// 상속받은쪽에서만 보이게
    protected BaseService<Req, Res, Entity> baseService;    // 상속받은쪽에서만 보이게 protected사용

    @Override
    @PostMapping("")
    public Header<Res> create(@RequestBody Header<Req> request) {
        return null;
    }

    @Override
    @GetMapping("{id}")
    public Header<Res> read(@PathVariable Integer id) {
        return null;
    }

    @Override
    @PutMapping("")
    public Header<Res> update(@RequestBody Header<Req> request) {       //RequestBody 회원가입과 수정을 위해서 사용!
        return null;
    }

    @Override
    @DeleteMapping("{id}")
    public Header<Res> delete(@PathVariable Integer id) {
        return null;
    }
}
