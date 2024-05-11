package com.example.dplace.board.repository;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BoardMapperDto {
	private Integer boardSeq;

	private String boardTitle;

	private String boardContent;

	private Integer userSeq;
}
