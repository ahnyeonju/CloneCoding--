package com.example.yanolza.model.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TbMemRole {
    USER("ROLE_USER", "일반사용자"),
    ADMIN("ROLE_ADMIN","관리자");

    private final String key;
    private final String title;
}
