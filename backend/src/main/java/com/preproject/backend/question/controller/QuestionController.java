package com.preproject.backend.question.controller;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.preproject.backend.dto.MultiResponseDto;
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

	// *** 질문 등록 ***
	@PostMapping
	public ResponseEntity postQuestion(@Valid @RequestBody QuestionDto.Post postDto) {

		Question createdQuestion = questionService.createQuestion(mapper.questionPostDtoToQuestion(postDto));

		QuestionDto.Response response = mapper.questionToQuestionResponseDto(createdQuestion);

		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	// *** 질문 수정 ***
	@PatchMapping("/{question-id}")
	public ResponseEntity patchQuestion(@PathVariable("question-id") Long id,
		@Valid @RequestBody QuestionDto.Patch patchDto) {

		patchDto.setId(id);
		Question question = questionService.updateQuestion(mapper.questionPatchDtoToQuestion(patchDto));

		return new ResponseEntity<>(mapper.questionToQuestionResponseDto(question), HttpStatus.OK);
	}

	// *** 하나의 질문 조회 ***
	@GetMapping("/{question-id}")
	public ResponseEntity getQuestion(@PathVariable("question-id") Long id) {
		Question question = questionService.findQuestion(id);

		return new ResponseEntity<>(mapper.questionToQuestionResponseDto(question), HttpStatus.OK);
	}

	// *** 전체 질문 조회 ***
	@GetMapping
	public ResponseEntity getQuestions(@Positive @RequestParam int page,
		@Positive @RequestParam int size) {

		Page<Question> pageQuestions = questionService.findQuestions(page - 1, size);
		List<Question> questions = pageQuestions.getContent();

		return new ResponseEntity<>(
			new MultiResponseDto<>(mapper.questionToQuestionResponseDtos(questions), pageQuestions),
			HttpStatus.OK);
	}

	// *** 질문 검색 ***
	@GetMapping("/search")
	public ResponseEntity searchQuestions(@RequestParam(name = "keyword") String keyword,
		@RequestParam(name = "page") @Positive int page,
		@RequestParam(name = "size") int size) {

		Page<Question> pageQuestions = questionService.searchQuestion(keyword, page - 1, size);
		List<Question> questions = pageQuestions.getContent();

		return new ResponseEntity<>(
			new MultiResponseDto<>(questions, pageQuestions), HttpStatus.OK);
	}

	// *** 하나의 질문 삭제 ***
	@DeleteMapping("/{question-id}")
	public ResponseEntity deleteQuestion(@PathVariable("question-id") Long id) {

		questionService.deleteQuestion(id);

		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	// *** 전체 질문 삭제 ***
	@DeleteMapping
	public ResponseEntity deleteQuestions(Question question) {

		questionService.deleteQuestions(question);

		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
