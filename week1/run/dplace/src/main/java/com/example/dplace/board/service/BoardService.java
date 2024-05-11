package com.example.dplace.board.service;

import com.example.dplace.board.dto.boardCreateDto.BoardCreateRequestDto;
import com.example.dplace.board.repository.BoardMapperDto;
import com.example.dplace.board.repository.BoardMapperRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardService {

	private final BoardMapperRepository boardMapperRepository;

	public Integer boardCreate(BoardCreateRequestDto requestDto) {
		BoardMapperDto boardMapperDto = BoardMapperDto.builder()
				.boardTitle(requestDto.getTitle())
				.boardContent(requestDto.getContent())
				.userSeq(requestDto.getUserSeq())
				.build();
		Integer boardSeq = boardMapperRepository.boardCreate(boardMapperDto);
		return boardSeq;
	}
}
