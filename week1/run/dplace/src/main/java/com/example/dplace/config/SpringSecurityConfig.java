package com.example.dplace.config;

import com.example.dplace.config.jwtConfig.CorsConfig;
import com.example.dplace.config.jwtFilter.JwtAuthFilter;
import com.example.dplace.config.jwtUtil.JwtUtil;
import com.example.dplace.login.service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.DispatcherType;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
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
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	// 세션 인증방식
//	@Bean
//	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//			http
//				.csrf((csrfConfig) ->
//						csrfConfig.disable()
//				)
//				.authorizeHttpRequests((authorizeRequests) ->
//						authorizeRequests
//								.dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll() //jsp 리졸버방식 허용
//								.requestMatchers("/", "/index.do", "/login/**").permitAll()
//								.requestMatchers("/posts/**").hasRole("USER_ROLE")
//								.requestMatchers("/admins/**").hasRole("ADMIN_ROLE")
//								.anyRequest().authenticated()
//				)
//				.exceptionHandling((exceptionConfig) ->
//						exceptionConfig.authenticationEntryPoint(unauthorizedEntryPoint).accessDeniedHandler(accessDeniedHandler)
//				) // 401 403 관련 예외처리
//				.formLogin((formLogin) ->
//						formLogin
//								.loginPage("/login/login")
//								.usernameParameter("username")
//								.passwordParameter("password")
//								.loginProcessingUrl("/login/login-proc")//로그인 처리 컨트롤러가 필요한게 아니라 로그인처리를 통해 인증처리 후 인증정보를 저장. 아이디 비번을 알아서 조회함
//								.defaultSuccessUrl("/", true)//위의 로그인처리 과정으로 인해 해당 컨트롤러에서 인증정보 조회가능
//				)
//				.logout((logoutConfig) ->
//						logoutConfig
//								.logoutUrl("/login/logout")
//								.logoutSuccessUrl("/")
//				)
//				.userDetailsService(myUserDetailsService);
//		return http.build();
//	}
//
//	private final AuthenticationEntryPoint unauthorizedEntryPoint =
//			(request, response, authException) -> {
//				PrintWriter writer = response.getWriter();
//				writer.write("{error: '401'}");
//				writer.flush();
//			};
//
//	private final AccessDeniedHandler accessDeniedHandler =
//			(request, response, accessDeniedException) -> {
//				response.setContentType(MediaType.APPLICATION_JSON_VALUE);
//				PrintWriter writer = response.getWriter();
//				writer.write("{error: '403'}");
//				writer.flush();
//			};
//
//	// 로그인시 입력한 비밀번호와 DB에 저장된 유저정보를 매칭시 암호화여부를 검사하는듯
//	// DB에는 비밀번호가 암호화처리되어 저장되어있어야함, 그렇지 않고 로그인시 오류 발생 : There is no PasswordEncoder mapped for the id "null"

//	// jwt 토큰인증방식
	private final JwtUtil jwtUtil;

	private static final String[] AUTH_WHITELIST = {
			"/api/v1/auth/**"
	};

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		//CSRF, CORS
		http
				.csrf((csrf) -> csrf.disable())
				.cors(Customizer.withDefaults());

		//세션 관리 상태 없음으로 구성, Spring Security가 세션 생성 or 사용 X
		http.sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		// FormLogin, BasicHttp 비활성화
		http
				.formLogin((form) -> form.disable())
				.httpBasic(AbstractHttpConfigurer::disable);

		// JwtAuthFilter 를 UsernamePasswordAuthenticationFilter 앞에 추가
		http
				.addFilterBefore(new JwtAuthFilter(myUserDetailsService, jwtUtil), UsernamePasswordAuthenticationFilter.class);
		// 커스텀 ExceptionHandling 사용

		http.authorizeHttpRequests(authorize -> authorize
				.requestMatchers(AUTH_WHITELIST).permitAll()// @PreAuthrization을 사용할 것이기 때문에 모든 경로에 대한 인증처리는 Pass
				.anyRequest().permitAll()
			// .anyRequest().authenticated()
		);

		return http.build();
	}

}
