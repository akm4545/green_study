package com.example.dplace.board.repository;

import com.example.dplace.board.dto.boardDetailDto.BoardDetailResponseDto;
import com.example.dplace.board.dto.boardListDto.BoardListResponseDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardMapperRepository {
	Integer boardCreate(BoardMapperDto boardMapperDto);

	Integer boardListTotCnt();

	List<BoardMapperDto> boardList();

	BoardMapperDto boardDetail(BoardMapperDto boardMapperDto);

	void boardUpdate(BoardMapperDto boardMapperDto);

	void boardDelete(BoardMapperDto boardMapperDto);
}
