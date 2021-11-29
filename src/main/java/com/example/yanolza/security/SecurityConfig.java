package com.example.yanolza.security;

import com.example.yanolza.security.main.FormSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.firewall.DefaultHttpFirewall;
import org.springframework.security.web.firewall.HttpFirewall;

@Order(1)
@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final FormSuccessHandler formSuccessHandler;

    @Order(1)
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf()
                .disable()
                .authorizeRequests()
                .antMatchers("/static/**", "/**","/userindex/**").hasRole("USER")   //   "/resources/", "/**", "/global/**",  ,"/**" 나중에 다시   ,"/**"      // test
                .antMatchers("/**").permitAll() // 잠시 설정
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

    @Order(2)
    @Configuration
    public class SecurityAdmin extends WebSecurityConfigurerAdapter {
        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http
                    .csrf()
                    .disable()
                    .authorizeRequests()
                    .antMatchers("/static/**", "/adminindex/**").hasRole("admin")   //   "/resources/", "/**", "/global/**",  ,"/**" 나중에 다시   ,"/**"      // test
                    .and()
                    .httpBasic().disable()
                    .formLogin()
                    .loginPage("/adminindex/login")
                    .loginProcessingUrl("/login_admin")
                    .defaultSuccessUrl("/userindex/")
                    .failureUrl("/error")
                    .usernameParameter("memEmail")
                    .passwordParameter("memPw")
                    .successHandler(formSuccessHandler);
        }

        @Override
        public void configure(WebSecurity web) {
            web.ignoring()
                    .requestMatchers(PathRequest.toStaticResources().atCommonLocations())   //,"/api3/**","/css/**", "/event/**","/img/**","/frontend"
                    .antMatchers("/adminindex/login","/adminindex/","/userindex/", "/userindex/login", "/userindex/join", "/error");
            web.httpFirewall(defaultHttpFirewall());
        }


        @Bean
        public PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }

        @Bean
        public HttpFirewall defaultHttpFirewall() {
            return new DefaultHttpFirewall();
        }


    }
}