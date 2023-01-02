package com.preproject.backend.config;

import com.preproject.backend.auth.filter.JwtAuthenticationFilter;
import com.preproject.backend.auth.filter.JwtLogoutFilter;
import com.preproject.backend.auth.filter.JwtVerificationFilter;
import com.preproject.backend.auth.handler.MemberAccessDeniedHandler;
import com.preproject.backend.auth.handler.MemberAuthenticationEntryPoint;
import com.preproject.backend.auth.handler.MemberAuthenticationFailureHandler;
import com.preproject.backend.auth.handler.MemberAuthenticationSuccessHandler;
import com.preproject.backend.auth.handler.MemberLogoutHandler;
import com.preproject.backend.auth.handler.MemberLogoutSuccessHandler;
import com.preproject.backend.auth.jwt.JwtTokenizer;
import com.preproject.backend.auth.utils.CustomAuthorityUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    private final RedisTemplate<String, String> redisTemplate;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils, RedisTemplate<String, String> redisTemplate) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.redisTemplate = redisTemplate;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors(withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .logout().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(
                        authorizationManagerRequestMatcherRegistry ->
                                authorizationManagerRequestMatcherRegistry
                                        /* TODO 사용자 정보 조회 (GET) 다시 생각해보기*/
//                                        회원 가입
                                        .antMatchers(HttpMethod.POST, "/members").permitAll()
//                                        회원 정보 조회, 수정, 삭제
                                        .antMatchers("/members/{member-id:[\\d]+}/**").hasRole("USER")
//                                        특정 질문 조회, 전체 질문 조회(추천순, 최신순), 질문 검색
                                        .antMatchers(HttpMethod.GET, "/questions/*").permitAll()
//                                        질문 등록
                                        .antMatchers(HttpMethod.POST, "/questions").hasRole("USER")
//                                        질문 전체 삭제
                                        .antMatchers(HttpMethod.DELETE, "/questions").hasRole("ADMIN")
//                                        특정 질문 추천 / 비추천, 특정 질문 수정, 특정 질문 삭제
                                        .antMatchers("/questions/{question-id:[\\d]+}/*").hasRole("USER")
//                                        전체 답변 조회(추천, 최신)
                                        .antMatchers(HttpMethod.GET, "/answers/*").permitAll()
//                                        답변 등록
                                        .antMatchers(HttpMethod.POST, "/answers").hasRole("USER")
//                                        특정 답변 추천 / 비추천, 특정 답변 수정, 특정 답변 삭제
                                        .antMatchers("/answers/{answer-id:[\\d]+}/*").hasRole("USER")
//                                        질문 댓글 등록, 수정, 삭제
                                        .antMatchers("/question-comments/*").hasRole("USER")
//                                        답변 댓글 등록, 수정, 삭제
                                        .antMatchers("/answer-comments/*").hasRole("USER")
                                        .anyRequest().permitAll()

                );

        return httpSecurity.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(Arrays.asList("*"));
        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE"));
        corsConfiguration.setAllowedHeaders(Arrays.asList("*"));
        corsConfiguration.addExposedHeader("Authorization");
        corsConfiguration.addExposedHeader("Refresh");

        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        urlBasedCorsConfigurationSource
                .registerCorsConfiguration("/**", corsConfiguration);

        return urlBasedCorsConfigurationSource;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter =
                    new JwtAuthenticationFilter(authenticationManager, jwtTokenizer, redisTemplate);

            jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils, redisTemplate);

            JwtLogoutFilter jwtLogoutFilter =
                    new JwtLogoutFilter(
                            new MemberLogoutSuccessHandler(),
                            new MemberLogoutHandler(jwtTokenizer, redisTemplate));

            jwtLogoutFilter.setFilterProcessesUrl("/auth/logout");

            builder.addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class)
                    .addFilterAfter(jwtLogoutFilter, JwtLogoutFilter.class);
        }
    }
}
