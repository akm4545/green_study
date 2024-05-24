package com.example.dplace.board.controller;

import com.example.dplace.board.dto.boardCreateDto.BoardCreateRequestDto;
import com.example.dplace.board.dto.boardCreateDto.BoardCreateResponseDto;
import com.example.dplace.board.dto.boardDetailDto.BoardDetailRequestDto;
import com.example.dplace.board.dto.boardDetailDto.BoardDetailResponseDto;
import com.example.dplace.board.dto.boardListDto.BoardListResponseDto;
import com.example.dplace.board.dto.boardUpdateDto.BoardUpdateRequestDto;
import com.example.dplace.board.dto.boardUpdateDto.BoardUpdateResponseDto;
import com.example.dplace.board.repository.BoardMapperDto;
import com.example.dplace.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Delete;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class BoardController {

	private final BoardService boardService;

	// 1.api 게시글 생성 (Post)
	@PostMapping("/board")
	public @ResponseBody BoardCreateResponseDto boardCreate(@RequestBody BoardCreateRequestDto requestDto){
		Integer boardSeq = boardService.boardCreate(requestDto);
		return BoardCreateResponseDto.builder()
				.boardSeq(boardSeq)
				.build();
	}

	// 2. 게시글 목록
	@GetMapping("/board/list")
	public @ResponseBody BoardListResponseDto boardList(){
		return boardService.boardList();
	}

	// 3. 게시글 상세
	@GetMapping("/board/{boardSeq}")
	public @ResponseBody BoardDetailResponseDto boardDetail(@PathVariable Integer boardSeq){
		return boardService.boardDetail(BoardDetailRequestDto.builder().boardSeq(boardSeq).build());
	}

	// 4. 게시글 수정
	@PutMapping(value = "/board/{boardSeq}")
	public @ResponseBody BoardUpdateResponseDto boardUpdate(@PathVariable Integer boardSeq, @RequestBody BoardUpdateRequestDto requestDto){
		requestDto.setBoardSeq(boardSeq);
		return boardService.boardUpdate(requestDto);
	}

	// 5. 게시글 삭제
	@DeleteMapping("/board/{boardSeq}")
	public @ResponseBody BoardUpdateResponseDto boardDelete(@PathVariable Integer boardSeq){
		return boardService.boardDelete(BoardUpdateRequestDto.builder().boardSeq(boardSeq).build());
	}

	// 6. 게시판 리스트 화면
	@GetMapping("/board/view/list")
	public String viewList(ModelMap model){
		return "www/board/board_list";
	}
}
