package com.preproject.backend.answer.controller;

import com.preproject.backend.answer.dto.AnswerDto;
import com.preproject.backend.answer.entity.Answer;
import com.preproject.backend.answer.mapper.AnswerMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/answers")
public class AnswerController {
    private final AnswerMapper mapper;

    public AnswerController(AnswerMapper mapper) {
        this.mapper = mapper;
    }

    // 답변 등록
    @PostMapping
    public ResponseEntity postAnswer(@RequestBody AnswerDto.Post requestBody) {
        Answer answer = mapper.answerPostDtoToAnswer(requestBody);
        answer.setId(1L);

        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(answer), HttpStatus.CREATED);
    }

    // 답변 수정
    @PatchMapping("/{answer-id}")
    public ResponseEntity patchAnswer(@PathVariable("answer-id") long id,
                                      @RequestBody AnswerDto.Patch requestBody) {
        requestBody.setId(id);
        Answer answer = mapper.answerPatchDtoToAnswer(requestBody);
        answer.setAnswerStatus(Answer.AnswerStatus.UNACCEPTED);

        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(answer), HttpStatus.OK);
    }

    // 답변 조회
    @GetMapping
    public ResponseEntity getAnswers() {
        return ResponseEntity.ok(null);
    }

    // 답변 삭제
    @GetMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") long id) {
        return ResponseEntity.noContent().build();
    }

    // 답변 추천
    @PatchMapping("/{answer-id}/upvotes")
    public void upVoteAnswer(@PathVariable("answer-id") long id) {

    }

    // 답변 삭제
    @PatchMapping("/{answer-id}/downvotes")
    public void downVoteAnswer(@PathVariable("answer-id") long id) {

    }

//    답변 공유
//    @GetMapping("/{answer-id}")
//    public ResponseEntity getAnswer(@PathVariable("answer-id") long id) {
//        return ResponseEntity.ok(null);
//    }

}
