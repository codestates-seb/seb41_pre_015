package com.preproject.backend.auth.filter;

import com.preproject.backend.auth.jwt.JwtTokenizer;
import com.preproject.backend.auth.utils.CustomAuthorityUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.ObjectUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.List;

public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils customAuthorityUtils;

    private final RedisTemplate<String, String> redisTemplate;

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer,
                                 CustomAuthorityUtils customAuthorityUtils,
                                 RedisTemplate<String, String> redisTemplate) {

        this.jwtTokenizer = jwtTokenizer;
        this.customAuthorityUtils = customAuthorityUtils;
        this.redisTemplate = redisTemplate;
    }
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try {
            String jws =  request.getHeader("Authorization").replace("Bearer ", "");
            String encodeBase64SecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
            Jws<Claims> claims = jwtTokenizer.getClaims(jws, encodeBase64SecretKey);

//            isExpired(claims);

            setAuthenticationToContext(jws);
        } catch (SignatureException signatureException) {
            request.setAttribute("exception", signatureException);
        } catch (ExpiredJwtException expiredJwtException) {
            request.setAttribute("exception", expiredJwtException);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }


        filterChain.doFilter(request, response);
    }

    private void isExpired(Jws<Claims> claimsJws) {
        if (claimsJws.getBody().getExpiration().after(new Date())) {
            throw new ExpiredJwtException(claimsJws.getHeader(), claimsJws.getBody(), "토큰 기한 만료");
        }
    }

    private void setAuthenticationToContext(String jws) {
        String tokenFromRedis = redisTemplate.opsForValue().get(jws);

        if (ObjectUtils.isEmpty(tokenFromRedis)) {
            String encodeBase64SecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
            Claims claimsBody = jwtTokenizer.getClaims(jws, encodeBase64SecretKey).getBody();

            String username = (String) claimsBody.get("username");

            List<GrantedAuthority> authorities =
                    customAuthorityUtils.createAuthorities((List<String>)claimsBody.get("roles"));

            Authentication authentication
                    = new UsernamePasswordAuthenticationToken(username, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
    }
}
