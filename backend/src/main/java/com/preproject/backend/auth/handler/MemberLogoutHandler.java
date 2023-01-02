package com.preproject.backend.auth.handler;

import com.preproject.backend.auth.jwt.JwtTokenizer;
import io.jsonwebtoken.Claims;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.concurrent.TimeUnit;


public class MemberLogoutHandler implements LogoutHandler {
    private final JwtTokenizer jwtTokenizer;

    private final RedisTemplate<String, String> redisTemplate;


    public MemberLogoutHandler(JwtTokenizer jwtTokenizer, RedisTemplate<String, String> redisTemplate) {
        this.jwtTokenizer = jwtTokenizer;
        this.redisTemplate = redisTemplate;
    }

    @Override
    public void logout(HttpServletRequest request,
                       HttpServletResponse response,
                       Authentication authentication) {

        String accessToken = getAccessToken(request);
        Claims claims = verifyJws(accessToken);

        String email = (String) claims.get("username");

        long remainExpTime = calculateRemainExpiration(claims);

        if (redisTemplate.opsForValue().get(email) != null) {
            redisTemplate.delete(email);
            redisTemplate.opsForValue().set(
                    accessToken,
                    "logout",
                    remainExpTime,
                    TimeUnit.MILLISECONDS);
        }
    }

    private String getAccessToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
            return bearerToken.replace("Bearer ", "");
        }

        return null;
    }

    private Claims verifyJws(String accessToken) {
        String encodeBase64SecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        return jwtTokenizer.getClaims(accessToken, encodeBase64SecretKey).getBody();
    }

    private long calculateRemainExpiration(Claims claims) {
        return claims.getExpiration().getTime() - new Date().getTime();
    }
}
