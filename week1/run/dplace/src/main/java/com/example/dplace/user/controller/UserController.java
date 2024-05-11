package com.example.dplace.user.controller;

import com.example.dplace.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

@Controller
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;

	// 1.회원가입
	@PostMapping("/user")
	public void userCreate(){

	}

	// 2.회원수정
	@PutMapping("/user/{userSeq}")
	public void userUpdate(){

	}

	// 3.회원탈퇴
	@DeleteMapping("/user/{userSeq}")
	public void userDelete(){

	}

	// 4.로그인
	@PostMapping("/user/login")
	public void userLogin(){

	}

	// 5.로그아웃
	@PostMapping("/user/logout")
	public void userLogout(){

	}
}
