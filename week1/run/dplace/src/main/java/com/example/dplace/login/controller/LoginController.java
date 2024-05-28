package com.example.dplace.login.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class LoginController {

	@GetMapping("/login/login")
	public String loginLogin(){
		return "www/login/login";
	}

//	@PostMapping("/login/login-proc")
//	public String loginLoginProc(@AuthenticationPrincipal UserDetails user){
//		System.out.println("zz 로그인 처리 인증된 유저정보  : " + user);
//		return "redirect:/index.do";
//	}
}
