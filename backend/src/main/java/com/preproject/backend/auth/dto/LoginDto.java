package com.preproject.backend.auth.dto;

import lombok.Getter;

@Getter
public class LoginDto {
    // TODO email로 쓸지 username으로 쓸지
    private String email;
    private String password;
}
