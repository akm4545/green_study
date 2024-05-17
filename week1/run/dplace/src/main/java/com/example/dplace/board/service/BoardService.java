package com.example.dplace.board.service;

import com.example.dplace.board.dto.boardCreateDto.BoardCreateRequestDto;
import com.example.dplace.board.dto.boardDetailDto.BoardDetailRequestDto;
import com.example.dplace.board.dto.boardDetailDto.BoardDetailResponseDto;
import com.example.dplace.board.dto.boardListDto.BoardListResponseDto;
import com.example.dplace.board.dto.boardUpdateDto.BoardUpdateRequestDto;
import com.example.dplace.board.dto.boardUpdateDto.BoardUpdateResponseDto;
import com.example.dplace.board.repository.BoardMapperDto;
import com.example.dplace.board.repository.BoardMapperRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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

	public BoardListResponseDto boardList() {
		return BoardListResponseDto.builder()
				.totCnt(boardMapperRepository.boardListTotCnt())
				.boardMapperDtoList(boardMapperRepository.boardList())
				.build();
	}

	public BoardDetailResponseDto boardDetail(BoardDetailRequestDto requestDto) {
		BoardMapperDto paramBoardMapperDto = BoardMapperDto.builder()
				.boardSeq(requestDto.getBoardSeq())
				.build();
		BoardMapperDto resultBoardMapperDto = boardMapperRepository.boardDetail(paramBoardMapperDto);
		if(resultBoardMapperDto != null){
			return BoardDetailResponseDto.builder()
					.boardTitle(resultBoardMapperDto.getBoardTitle())
					.boardContent(resultBoardMapperDto.getBoardContent())
					.userSeq(resultBoardMapperDto.getUserSeq())
					.build();
		}
		return BoardDetailResponseDto.builder().build();
	}

	public BoardUpdateResponseDto boardUpdate(BoardUpdateRequestDto requestDto) {
		BoardMapperDto paramBoardMapperDto = BoardMapperDto.builder()
				.boardSeq(requestDto.getBoardSeq())
				.boardTitle(requestDto.getTitle())
				.boardContent(requestDto.getContent())
				.userSeq(requestDto.getUserSeq())
				.build();
		BoardMapperDto resultBoardMapperDto = boardMapperRepository.boardDetail(paramBoardMapperDto);
		if(resultBoardMapperDto != null){
			boardMapperRepository.boardUpdate(paramBoardMapperDto);
			return BoardUpdateResponseDto.builder().resultCode("SUCCESS").build();
		}
		return BoardUpdateResponseDto.builder().resultCode("FAIL").build();
	}

	public BoardUpdateResponseDto boardDelete(BoardUpdateRequestDto requestDto) {
		BoardMapperDto paramBoardMapperDto = BoardMapperDto.builder()
				.boardSeq(requestDto.getBoardSeq())
				.build();
		BoardMapperDto resultBoardMapperDto = boardMapperRepository.boardDetail(paramBoardMapperDto);
		if(resultBoardMapperDto != null){
			boardMapperRepository.boardDelete(paramBoardMapperDto);
			return BoardUpdateResponseDto.builder().resultCode("SUCCESS").build();
		}
		return BoardUpdateResponseDto.builder().resultCode("FAIL").build();
	}
}
