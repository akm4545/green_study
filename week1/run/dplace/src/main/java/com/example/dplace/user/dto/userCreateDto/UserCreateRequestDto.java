package com.example.dplace.user.dto.userCreateDto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserCreateRequestDto {
	private String userId;

	private String userPassword;

	private String userAuthType;
}
