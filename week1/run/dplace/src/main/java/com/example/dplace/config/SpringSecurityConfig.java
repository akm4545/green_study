package com.example.dplace.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.DispatcherType;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.web.ErrorResponse;

import java.io.PrintWriter;
//https://velog.io/@woosim34/Spring-Spring-Security-%EC%84%A4%EC%A0%95-%EB%B0%8F-%EA%B5%AC%ED%98%84SessionSpring-boot3.0-%EC%9D%B4%EC%83%81

//1. SESSION 방식
//2. jwt 방식
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SpringSecurityConfig {

	private final MyUserDetailsService myUserDetailsService;
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
			http
				.csrf((csrfConfig) ->
						csrfConfig.disable()
				) // 1번
				.authorizeHttpRequests((authorizeRequests) ->
						authorizeRequests
//								.requestMatchers("/post/**").hasRole("ROLE_USER")
								.dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll() //jsp 리졸버방식 허용
								.requestMatchers("/", "/index.do", "/login/**").permitAll()
								.anyRequest().authenticated()
				)// 3번
				.exceptionHandling((exceptionConfig) ->
						exceptionConfig.authenticationEntryPoint(unauthorizedEntryPoint).accessDeniedHandler(accessDeniedHandler)
				) // 401 403 관련 예외처리
				.formLogin((formLogin) ->
						formLogin
								.loginPage("/login/login")
								.usernameParameter("username")
								.passwordParameter("password")
								.loginProcessingUrl("/login/login-proc")
								.defaultSuccessUrl("/", true)
				)
				.logout((logoutConfig) ->
						logoutConfig.logoutSuccessUrl("/")
				)
				.userDetailsService(myUserDetailsService);
		return http.build();
	}

	private final AuthenticationEntryPoint unauthorizedEntryPoint =
			(request, response, authException) -> {
				PrintWriter writer = response.getWriter();
				writer.write("{error: '401'}");
				writer.flush();
			};

	private final AccessDeniedHandler accessDeniedHandler =
			(request, response, accessDeniedException) -> {
				response.setContentType(MediaType.APPLICATION_JSON_VALUE);
				PrintWriter writer = response.getWriter();
				writer.write("{error: '403'}");
				writer.flush();
			};
}
