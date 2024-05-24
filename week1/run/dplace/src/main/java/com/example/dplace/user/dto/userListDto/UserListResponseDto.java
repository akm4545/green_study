package com.example.dplace.user.dto.userListDto;

import com.example.dplace.user.repository.UserMapperDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UserListResponseDto {
	private Integer totCnt;

	private List<UserMapperDto> userMapperDtoList;
}
