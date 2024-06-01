package com.example.dplace.user.dto.userLoginDto;

import com.example.dplace.login.service.AuthService;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserLoginRequestDto {
	private String userId;
	private String userPassword;
}
