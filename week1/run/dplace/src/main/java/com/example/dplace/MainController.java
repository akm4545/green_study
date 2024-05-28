package com.example.dplace;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class MainController {

	private final PasswordEncoder passwordEncoder;

	@GetMapping("/index.do")
	public String main(){
		//System.out.println("zz : " + passwordEncoder.encode("1234"));
		// 1234 암호화값 : $2a$10$M158M1Bga.1l2V7.iZ5RtOgRTR2fuVWGRNchPcqIfQNju.2RyY0S2
		return "www/main";
	}
}
