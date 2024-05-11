package com.example.dplace.board.repository;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardMapperRepository {
	Integer boardCreate(BoardMapperDto boardMapperDto);
}
