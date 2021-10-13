package com.example.yanolza.Ifs;

import com.example.yanolza.model.network.Header;

public interface CrudInterface<Req, Res> {    // 얘를 상속받으면 이 밑의꺼 꼭 만들어ㅑ함!
//    void create();  // 헤더 이용해서 리턴값 넘기기 사용자쪽에 이 메서드써서
    Header<Res> create(Header<Req> request);
    // id 받아다가 select 하기!
    Header<Res> read(Integer id);

    Header<Res> update(Header<Req> request);

    Header<Res> delete(Integer id);
}
