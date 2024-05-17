package com.example.dplace.board.dto.boardListDto;

import com.example.dplace.board.repository.BoardMapperDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class BoardListResponseDto {

	private Integer totCnt;

	private List<BoardMapperDto> boardMapperDtoList;

}
