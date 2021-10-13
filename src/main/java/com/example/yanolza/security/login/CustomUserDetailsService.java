package com.example.yanolza.security.login;

import com.example.yanolza.model.entity.TbMem;
import com.example.yanolza.repository.TbMemRepository;
import com.example.yanolza.security.data.TbMemberContext;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor //전달 받은 값이 존재함
@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final TbMemRepository tbMemRepository;

    @Override
    public UserDetails loadUserByUsername(String memEmail) throws UsernameNotFoundException {
        TbMem tbMem = tbMemRepository.findByMemEmail(memEmail)
                .orElseThrow( () -> new UsernameNotFoundException("이메일을 찾을 수 없습니다 : " + memEmail));
        return new TbMemberContext(tbMem);
    }

    /*
    * 위처럼 loadUserByUsername 메소드는 UserDetails를 반환하는데, tbMemRepository에서 얻어온 TbMem과는 타입이 맞지 않는다.
    * 이 타입을 맞춰주기 위해 Spring Security의 User를 상속하는 커스텀 유저 클래스를 추가해주자. → TbMemberContext
     * */
}


