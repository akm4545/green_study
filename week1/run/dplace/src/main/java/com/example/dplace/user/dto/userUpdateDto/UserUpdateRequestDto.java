package com.example.dplace.user.dto.userUpdateDto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserUpdateRequestDto {
	private Integer userSeq;

	private String userId;

	private String userPassword;

	private String userAuthType;
}
