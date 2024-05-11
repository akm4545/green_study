package com.example.dplace.board.dto.boardCreateDto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BoardCreateRequestDto {

	private String title;

	private String content;

	private Integer userSeq;
}
