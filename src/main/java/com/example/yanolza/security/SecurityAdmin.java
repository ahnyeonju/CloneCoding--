//package com.example.yanolza.security;
//
//import com.example.yanolza.security.main.FormSuccessHandler;
//import lombok.RequiredArgsConstructor;
//import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.annotation.Order;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.builders.WebSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.firewall.DefaultHttpFirewall;
//import org.springframework.security.web.firewall.HttpFirewall;
//
//@Order(2)
//@Configuration
//@RequiredArgsConstructor
//@EnableWebSecurity
//public class SecurityAdmin extends WebSecurityConfigurerAdapter{
//    private final FormSuccessHandler formSuccessHandler;
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//                .csrf()
//                .disable()
//                .authorizeRequests()
//                .antMatchers("/static/**"  ,"/**").permitAll()   //   "/resources/", "/**", "/global/**",  ,"/**" 나중에 다시   ,"/**"      // test
//                .anyRequest().authenticated()
//                .and()
//                .httpBasic().disable()
//                .formLogin()
//                .loginPage("/adminindex/login")
//                .loginProcessingUrl("/login_admin")
//                .defaultSuccessUrl("/adminindex/")
//                .failureUrl("/error")
//                .usernameParameter("memEmail")
//                .passwordParameter("memPw")
//                .successHandler(formSuccessHandler);
//    }
//    @Override
//    public void configure(WebSecurity web){
//        web.ignoring()
//                .requestMatchers(PathRequest.toStaticResources().atCommonLocations())   //,"/api3/**","/css/**", "/event/**","/img/**","/frontend"
//                .antMatchers("/userindex/", "/userindex/login","/userindex/join", "/error" );
//        web.httpFirewall(defaultHttpFirewall());
//    }
//    @Bean
//    public PasswordEncoder passwordEncoder(){
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public HttpFirewall defaultHttpFirewall() {
//        return new DefaultHttpFirewall();
//    }
//
//
//}