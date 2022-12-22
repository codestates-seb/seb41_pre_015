package com.preproject.backend.question.controller;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.preproject.backend.question.dto.QuestionDto;
import com.preproject.backend.question.entity.Question;
import com.preproject.backend.question.mapper.QuestionMapper;
import com.preproject.backend.question.service.QuestionService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/questions")
@Slf4j
public class QuestionController {

	// DI
	private final QuestionMapper mapper;
	private final QuestionService questionService;

	public QuestionController(QuestionMapper questionMapper, QuestionService questionService) {
		this.mapper = questionMapper;
		this.questionService = questionService;
	}

	// 질문 등록
	@PostMapping
	public ResponseEntity postQuestion(@Valid @RequestBody QuestionDto.Post postDto) {
		// Question question = mapper.questionPostDtoToQuestion(postDto);
		// Question createdQuestion = questionService.createQuestion(question);
		Question createdQuestion = questionService.createQuestion(mapper.questionPostDtoToQuestion(postDto));

		QuestionDto.Response response = mapper.questionToQuestionResponseDto(createdQuestion);

		return new ResponseEntity<>(postDto, HttpStatus.CREATED);
	}

	// 질문 수정
	@PatchMapping("/{question-id}")
	public ResponseEntity patchQuestion(@PathVariable("question-id") Long Id,
		@Valid @RequestBody QuestionDto.Patch patchDto) {

		patchDto.setId(Id);

		//Question question = questionService.updateQuestion(mapper.questionPatchDtoToQuestion(patchDto));

		return new ResponseEntity<>(patchDto, HttpStatus.OK);
	}

	// 하나의 질문 조회
	@GetMapping("/{question-id}")
	public ResponseEntity getQuestion(@PathVariable("question-id") Long Id) {

		return new ResponseEntity<>(HttpStatus.OK);
	}
 
	// 전체 질문 조회
	@GetMapping
	public ResponseEntity getQuestions() {

		return new ResponseEntity<>(HttpStatus.OK);
	}

	// 하나의 질문 삭제
	@DeleteMapping("/{question-id}")
	public ResponseEntity deleteQuestion(@PathVariable("question-id") long id) {

		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	// 전체 질문 삭제
	@DeleteMapping
	public ResponseEntity deleteQuestions(Question question) {

		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
