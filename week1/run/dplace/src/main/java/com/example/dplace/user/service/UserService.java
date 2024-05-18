package com.example.dplace.user.service;

import com.example.dplace.user.dto.userCreateDto.UserCreateRequestDto;
import com.example.dplace.user.dto.userDeleteDto.UserDeleteRequestDto;
import com.example.dplace.user.dto.userDeleteDto.UserDeleteResponseDto;
import com.example.dplace.user.dto.userUpdateDto.UserUpdateRequestDto;
import com.example.dplace.user.dto.userUpdateDto.UserUpdateResponseDto;
import com.example.dplace.user.repository.UserMapperDto;
import com.example.dplace.user.repository.UserMapperRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserMapperRepository userMapperRepository;

	public Integer userCreate(UserCreateRequestDto requestDto) {
		UserMapperDto userMapperDto = UserMapperDto.builder()
				.userId(requestDto.getUserId())
				.userPassword(requestDto.getUserPassword())
				.userAuthType(requestDto.getUserAuthType())
				.build();
		Integer userSeq = userMapperRepository.userCreate(userMapperDto);
		return userSeq;
	}

	public UserUpdateResponseDto userUpdate(UserUpdateRequestDto requestDto) {
		UserMapperDto paramUserMapperDto = UserMapperDto.builder()
				.userSeq(requestDto.getUserSeq())
				.userId(requestDto.getUserId())
				.userPassword(requestDto.getUserPassword())
				.userAuthType(requestDto.getUserAuthType())
				.build();
		UserMapperDto resultUserMapperDto = userMapperRepository.userDetail(paramUserMapperDto);
		if(resultUserMapperDto != null){
			userMapperRepository.userUpdate(paramUserMapperDto);
			return UserUpdateResponseDto.builder().resultCode("SUCCESS").build();
		}
		return UserUpdateResponseDto.builder().resultCode("FAIL").build();
	}

	public UserDeleteResponseDto userDelete(UserDeleteRequestDto requestDto) {
		UserMapperDto paramUserMapperDto = UserMapperDto.builder()
				.userSeq(requestDto.getUserSeq())
				.build();
		UserMapperDto resultUserMapperDto = userMapperRepository.userDetail(paramUserMapperDto);
		if(resultUserMapperDto != null){
			userMapperRepository.userDelete(paramUserMapperDto);
			return UserDeleteResponseDto.builder().resultCode("SUCCESS").build();
		}
		return UserDeleteResponseDto.builder().resultCode("FAIL").build();
	}
}
