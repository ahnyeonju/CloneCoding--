package com.example.yanolza.security.login;


import com.example.yanolza.repository.TbMemRepository;
import com.example.yanolza.security.data.TbMemDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class TbMemberService {
    private final TbMemRepository tbMemRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public Integer save(TbMemDTO tbMemDTO){
        System.out.println(tbMemDTO.getMemPw());
        System.out.println(passwordEncoder.encode(tbMemDTO.getMemPw()));
        tbMemDTO.setMemPw(passwordEncoder.encode(tbMemDTO.getMemPw()));
        return tbMemRepository.save(tbMemDTO.toEntity()).getId();
    }
}
