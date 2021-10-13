package com.example.yanolza.model.network;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Header <T> {
    private LocalDateTime transactionTime;
    private String resultCode;
    private String description;

    private T data;


    public static <T> Header<T> OK() {
        return (Header<T>) Header.builder()
                .transactionTime(LocalDateTime.now())
                .resultCode("OK")
                .description("KO")
                .build();

    }

    //  Data 리스트같은거
    public static <T> Header<T> OK(T data) { // 앞의 T는 그냥정의 뒤의 T는 리턴타입
        return (Header<T>) Header.builder()
                .resultCode("OK")
                .description("OK")
                .data(data)
                .build();
    }
// 제네릭에 한개만 들어갈 수 있는건 아님!!!! 두개일수도있음~


    //  error 안되면 error
    public static <T> Header<T> Error(String description) {
        return (Header<T>) Header.builder()
                .transactionTime(LocalDateTime.now())
                .resultCode("error")
                .description("error")
                .build();
    }
}
