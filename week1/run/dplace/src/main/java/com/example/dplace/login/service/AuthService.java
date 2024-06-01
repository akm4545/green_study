package com.example.dplace.login.service;

import com.example.dplace.config.jwtUtil.JwtUtil;
import com.example.dplace.user.dto.userLoginDto.UserLoginRequestDto;
import com.example.dplace.user.repository.UserMapperDto;
import com.example.dplace.user.repository.UserMapperRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthService {

	private final JwtUtil jwtUtil;
	private final UserMapperRepository userMapperRepository;
	private final PasswordEncoder encoder;

	public String login(UserLoginRequestDto requestDto) {
		UserMapperDto member = userMapperRepository.userSelectByUserId(UserMapperDto.builder().userId(requestDto.getUserId()).build());
		if(member == null){
			throw new UsernameNotFoundException("아이디가 존재하지 않습니다");
		}

		if(!encoder.matches(requestDto.getUserPassword(), member.getUserPassword())){
			throw new BadCredentialsException("비밀번호가 일치하지 않습니다.");
		}

		String accessToken = jwtUtil.createAccessToken(member);
		return accessToken;
	}
}
