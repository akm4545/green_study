package com.example.dplace;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class MainController {

	private final PasswordEncoder passwordEncoder;

	@GetMapping("/index.do")
	public String main(@AuthenticationPrincipal UserDetails user, Model model){
		System.out.println("zz UserDetails 로그인 인증 정보 : " + user);
		model.addAttribute("sessionUser", user);
		//System.out.println("zz : " + passwordEncoder.encode("1234"));
		// 1234 암호화값 : $2a$10$M158M1Bga.1l2V7.iZ5RtOgRTR2fuVWGRNchPcqIfQNju.2RyY0S2
		return "www/main";
	}

	@GetMapping("/posts/main")
	public String userMain(@AuthenticationPrincipal UserDetails user, Model model){
		model.addAttribute("user", user);
		return "www/author/user_main";
	}

	@GetMapping("/admins/main")
	public String adminMain(@AuthenticationPrincipal UserDetails user, Model model){
		model.addAttribute("admin", user);
		return "www/author/admin_main";
	}
}
