package com.example.dplace.board.controller;

import com.example.dplace.board.dto.boardCreateDto.BoardCreateRequestDto;
import com.example.dplace.board.dto.boardCreateDto.BoardCreateResponseDto;
import com.example.dplace.board.dto.boardDetailDto.BoardDetailResponseDto;
import com.example.dplace.board.dto.boardListDto.BoardListResponseDto;
import com.example.dplace.board.dto.boardUpdateDto.BoardUpdateResponseDto;
import com.example.dplace.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Delete;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class BoardController {

	private final BoardService boardService;

	// 1.api 게시글 생성 (Post)
	@PostMapping("/board")
	public @ResponseBody BoardCreateResponseDto boardCreate(@RequestBody BoardCreateRequestDto requestDto){
		boardService.boardCreate(requestDto);
		return null;
	}

	// 2. 게시글 목록
	@GetMapping("/board/list")
	public List<BoardListResponseDto> boardList(){

		return null;
	}

	// 3. 게시글 상세
	@GetMapping("/board/{boardSeq}")
	public BoardDetailResponseDto boardDetail(@PathVariable Integer boardSeq){
		return null;
	}

	// 4. 게시글 수정
	@PutMapping("/board/{boardSeq}")
	public BoardUpdateResponseDto boardUpdate(@PathVariable Integer boardSeq){
		return null;
	}

	// 5. 게시글 삭제
	@DeleteMapping("/board/{boardSeq}")
	public BoardDetailResponseDto boardDelete(@PathVariable Integer boardSeq){
		return null;
	}
}
