package com.example.yanolza.security;

import com.example.yanolza.security.main.FormSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.firewall.DefaultHttpFirewall;
import org.springframework.security.web.firewall.HttpFirewall;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final FormSuccessHandler formSuccessHandler;
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf()
                .disable()
                .authorizeRequests()
                .antMatchers("/static/**"  ,"/**").permitAll()   //   "/resources/", "/**", "/global/**",  ,"/**" 나중에 다시   ,"/**"      // test
                .antMatchers("/userindex").hasRole("USER")  // 이것도그냥
                .anyRequest().authenticated()
                .and()
                .httpBasic().disable()
                .formLogin()
                .loginPage("/userindex/login")
                .loginProcessingUrl("/login_proc")
                .defaultSuccessUrl("/userindex/")
                .failureUrl("/error")
                .usernameParameter("memEmail")
                .passwordParameter("memPw")
                .successHandler(formSuccessHandler)
                .and()
                .logout()
                .logoutUrl("/dologout")
                .logoutSuccessUrl("/userindex/login")
                .invalidateHttpSession(true).deleteCookies("JSESSIONDID");          // session 값이 삭제가 안되서 일단은 로그아웃은 된것같아서 일단 스탑,,,,
    }
    @Override
    public void configure(WebSecurity web){
        web.ignoring()
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations())   //,"/api3/**","/css/**", "/event/**","/img/**","/frontend"
                .antMatchers("/userindex/", "/userindex/login","/userindex/join", "/error" );
        web.httpFirewall(defaultHttpFirewall());
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public HttpFirewall defaultHttpFirewall() {
        return new DefaultHttpFirewall();
    }


}