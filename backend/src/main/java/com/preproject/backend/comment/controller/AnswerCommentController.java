package com.preproject.backend.comment.controller;

import com.preproject.backend.comment.dto.AnswerCommentDto;
import com.preproject.backend.comment.entity.AnswerComment;
import com.preproject.backend.comment.mapper.AnswerCommentMapper;
import com.preproject.backend.comment.service.AnswerCommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/answer-comments")
@Validated
public class AnswerCommentController {
    private final AnswerCommentService answerCommentServiceCommentService;
    private final AnswerCommentMapper mapper;

    public AnswerCommentController(AnswerCommentService answerCommentServiceCommentService, AnswerCommentMapper mapper) {
        this.answerCommentServiceCommentService = answerCommentServiceCommentService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity PostAnswerComment(@Valid @RequestBody AnswerCommentDto.Post requestBody) {
        AnswerComment answerComment = AnswerCommentController.this.answerCommentServiceCommentService.createComment(mapper.AnswerCommentPostDtoToAnswerComment(requestBody));

        return new ResponseEntity<>(mapper.AnswerCommentToAnswerCommentResponseDto(answerComment), HttpStatus.CREATED);
    }

    @PatchMapping("/{answer-comment-id}")
    public ResponseEntity PatchAnswerComment(@Positive @PathVariable("answer-comment-id") long id,
                                               @Valid @RequestBody AnswerCommentDto.Patch requestBody) {
        requestBody.setId(id);
        AnswerComment comment = AnswerCommentController.this.answerCommentServiceCommentService.updateComment(mapper.AnswerCommentPatchDtoToAnswerComment(requestBody));

        return new ResponseEntity<>(mapper.AnswerCommentToAnswerCommentResponseDto(comment), HttpStatus.OK);
    }

    @DeleteMapping("/{answer-comment-id}")
    public void deleteAnswerComment(@Positive @PathVariable("answer-comment-id") long id) {
        AnswerCommentController.this.answerCommentServiceCommentService.deleteComment(id);
    }
}
