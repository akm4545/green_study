package com.example.dplace.user.repository;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapperRepository {
	Integer userCreate(UserMapperDto userMapperDto);

	UserMapperDto userDetail(UserMapperDto userMapperDto);

	void userUpdate(UserMapperDto userMapperDto);

	void userDelete(UserMapperDto userMapperDto);
}
