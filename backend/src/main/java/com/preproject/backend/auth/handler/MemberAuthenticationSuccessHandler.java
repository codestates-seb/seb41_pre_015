package com.preproject.backend.auth.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.preproject.backend.auth.userdetails.MemberDetailsService;
import com.preproject.backend.member.entity.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.util.StreamUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        Member member = (Member) authentication.getPrincipal();

        ObjectMapper objectMapper = new ObjectMapper();

        // TODO 리팩토링, 로그인 전용 responseDto 생성

        Map<String, Object> loginResponse = new HashMap<>();
        loginResponse.put("id", member.getId());
        loginResponse.put("email", member.getEmail());
        loginResponse.put("roles", member.getRoles());

        String responseBody = objectMapper.writeValueAsString(loginResponse);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        response.getWriter().write(responseBody);

        log.info("# Authenticated successfully");
        log.info("name:{}, email: {}, role: {}", member.getName(), member.getEmail(), member.getRoles() );
    }
}
