package com.example.dplace.user.repository;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapperRepository {
	Integer userCreate(UserMapperDto userMapperDto);

	UserMapperDto userDetail(UserMapperDto userMapperDto);

	void userUpdate(UserMapperDto userMapperDto);

	void userDelete(UserMapperDto userMapperDto);

	Integer userListTotCnt();

	List<UserMapperDto> userList();
}
