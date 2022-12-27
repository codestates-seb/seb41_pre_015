package com.preproject.backend.answer.controller;

import com.preproject.backend.answer.dto.AnswerDto;
import com.preproject.backend.answer.dto.AnswerVoteDto;
import com.preproject.backend.answer.entity.Answer;
import com.preproject.backend.answer.mapper.AnswerMapper;
import com.preproject.backend.answer.service.AnswerService;
import com.preproject.backend.answer.service.AnswerVoteService;
import com.preproject.backend.dto.MultiResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/answers")
@Validated
public class AnswerController {

    private final AnswerService answerService;
    private final AnswerMapper mapper;
    private final AnswerVoteService answerVoteService;

    public AnswerController(AnswerService answerService, AnswerMapper mapper, AnswerVoteService answerVoteService) {
        this.answerService = answerService;
        this.mapper = mapper;
        this.answerVoteService = answerVoteService;
    }

    // 답변 등록
    @PostMapping
    public ResponseEntity postAnswer(@Valid @RequestBody AnswerDto.Post requestBody) {
        Answer answer = answerService.createAnswer(mapper.answerPostDtoToAnswer(requestBody));

        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(answer), HttpStatus.CREATED);
    }

    // 답변 수정
    @PatchMapping("/{answer-id}")
    public ResponseEntity patchAnswer(@Positive @PathVariable("answer-id") long id,
                                      @Valid @RequestBody AnswerDto.Patch requestBody) {
        requestBody.setId(id);
        Answer answer = answerService.updateAnswer(mapper.answerPatchDtoToAnswer(requestBody));


        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(answer), HttpStatus.OK);
    }

    // 답변 전체 조회
    @GetMapping
    public ResponseEntity getAnswers(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size) {
        Page<Answer> pageAnswers = answerService.findAnswers(page -1, size);
        List<Answer> answers = pageAnswers.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.answerToAnswerResponseDtos(answers), pageAnswers),
                HttpStatus.OK);

    }

    // 답변 삭제
    @DeleteMapping("/{answer-id}")
    public void deleteAnswer(@Positive @PathVariable("answer-id") long id) {
        answerService.deleteAnswer(id);
    }

    // 답변 추천
    @PatchMapping("/{answer-id}/upvotes")
    public ResponseEntity upVoteAnswer(@Positive @PathVariable("answer-id") long id,
                             @Valid @RequestBody AnswerVoteDto requestBody) {

        Answer votedAnswer = answerVoteService.upVoteAnswer(id, mapper.answerVoteDtoToAnswerVote(requestBody));

        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(votedAnswer), HttpStatus.OK);
    }

    // 답변 비추천
    @PatchMapping("/{answer-id}/downvotes")
    public ResponseEntity downVoteAnswer(@PathVariable("answer-id") long id,
                               @Valid @RequestBody AnswerVoteDto requestBody) {
        Answer votedAnswer = answerVoteService.downVoteAnswer(id, mapper.answerVoteDtoToAnswerVote(requestBody));

        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(votedAnswer), HttpStatus.OK);
    }

//    답변 공유
//    @GetMapping("/{answer-id}")
//    public ResponseEntity getAnswer(@PathVariable("answer-id") long id) {
//        return ResponseEntity.ok(null);
//    }

}
