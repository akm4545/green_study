package com.example.dplace.board.dto.boardDetailDto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BoardDetailResponseDto {

	private String boardTitle;

	private String boardContent;

	private Integer userSeq;
}
