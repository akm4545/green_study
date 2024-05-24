package com.example.dplace.user.dto.userListDto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserListRequestDto {
	private String userId;

	private String userPassword;

	private String userAuthType;
}
