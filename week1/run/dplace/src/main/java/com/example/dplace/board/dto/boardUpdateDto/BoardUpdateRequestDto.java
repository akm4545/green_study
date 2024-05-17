package com.example.dplace.board.dto.boardUpdateDto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BoardUpdateRequestDto {
	private Integer boardSeq;

	private String title;

	private String content;

	private Integer userSeq;
}
