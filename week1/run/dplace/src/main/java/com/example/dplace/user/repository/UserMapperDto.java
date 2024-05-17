package com.example.dplace.user.repository;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserMapperDto {
	private Integer userSeq;

	private String userId;

	private String userPassword;

	private String userAuthType;
}
