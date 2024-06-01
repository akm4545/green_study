package com.example.dplace.config.jwtFilter;

import com.example.dplace.config.MyUserDetailsService;
import com.example.dplace.config.jwtUtil.JwtUtil;
import com.example.dplace.login.service.AuthService;
import com.example.dplace.user.dto.userLoginDto.UserLoginRequestDto;
import com.example.dplace.user.repository.UserMapperDto;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter { // OncePerRequestFilter -> 한 번 실행 보장

	private final MyUserDetailsService myUserDetailsService;
	private final JwtUtil jwtUtil;


	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
		String authorizationHeader = request.getHeader("Authorization");

		// JWT가 헤더에 있는 경우
		if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
			String token = authorizationHeader.substring(7);
			// JWT 유효성 검증
			if(jwtUtil.validateToken(token)){
				String userId = jwtUtil.getUserId(token);

				// 유저와 토큰 일치 시 userDetails 생성
				UserDetails userDetails = myUserDetailsService.loadUserByUsername(userId);
				if(userDetails != null){
					// UserDetails, Password, Role -> 접근권한 인증 Token 생성
					UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
							new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

					// 현재 Request의 Security Context에 접근권한 설정
					SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
				}
			}
		}
		filterChain.doFilter(request, response);
	}
}
