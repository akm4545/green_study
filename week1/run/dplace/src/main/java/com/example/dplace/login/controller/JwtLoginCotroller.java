package com.example.dplace.login.controller;

import com.example.dplace.login.service.AuthService;
import com.example.dplace.user.dto.userLoginDto.UserLoginRequestDto;
import com.example.dplace.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class JwtLoginCotroller {

	private final AuthService authService;

	@Value("${jwt.secret}") private String secretKey;
	@PostMapping("/api/v1/auth/login")
	public ResponseEntity<String> getMemberProfile(@RequestBody UserLoginRequestDto requestDto){
		System.out.println("zz : " + secretKey);
		String token = authService.login(requestDto);
		return ResponseEntity.status(HttpStatus.OK).body(token);
	}
}
