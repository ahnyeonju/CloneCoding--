package com.example.yanolza.security.main;

import com.example.yanolza.security.data.TbMemberContext;
import com.example.yanolza.security.login.CustomUserDetailsService;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;


public class FormAuthenticationProvider implements AuthenticationProvider {
    private CustomUserDetailsService memberDetailService;
    private PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String memEmail = authentication.getName();
        String memPw = (String)authentication.getCredentials();

        TbMemberContext memberContext = (TbMemberContext) memberDetailService.loadUserByUsername(memEmail);
        String password = memberContext.getTbMem().getMemPw();

        if(!passwordEncoder.matches(memPw, password)){
            throw new BadCredentialsException("비밀번호가 틀립니다");
        }
        return new UsernamePasswordAuthenticationToken(memberContext.getTbMem(), null);
        // 해당 아이디랑 비번이에 대한 인증 토큰을 만들어주는 메소드
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
