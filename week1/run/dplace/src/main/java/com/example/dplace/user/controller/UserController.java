package com.example.dplace.user.controller;

import com.example.dplace.user.dto.userCreateDto.UserCreateRequestDto;
import com.example.dplace.user.dto.userCreateDto.UserCreateRespnseDto;
import com.example.dplace.user.dto.userDeleteDto.UserDeleteRequestDto;
import com.example.dplace.user.dto.userDeleteDto.UserDeleteResponseDto;
import com.example.dplace.user.dto.userUpdateDto.UserUpdateRequestDto;
import com.example.dplace.user.dto.userUpdateDto.UserUpdateResponseDto;
import com.example.dplace.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;

	// 1.회원가입
	@PostMapping("/user")
	public @ResponseBody UserCreateRespnseDto userCreate(@RequestBody UserCreateRequestDto requestDto){
		Integer userSeq = userService.userCreate(requestDto);
		return UserCreateRespnseDto.builder().userSeq(userSeq).build();
	}

	// 2.회원수정
	@PutMapping("/user/{userSeq}")
	public @ResponseBody UserUpdateResponseDto userUpdate(@PathVariable Integer userSeq, @RequestBody UserUpdateRequestDto requestDto){
		requestDto.setUserSeq(userSeq);
		return userService.userUpdate(requestDto);
	}

	// 3.회원탈퇴
	@DeleteMapping("/user/{userSeq}")
	public @ResponseBody UserDeleteResponseDto userDelete(@PathVariable Integer userSeq){
		return userService.userDelete(UserDeleteRequestDto.builder().userSeq(userSeq).build());
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
