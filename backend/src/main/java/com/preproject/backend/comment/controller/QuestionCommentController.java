package com.preproject.backend.comment.controller;

import com.preproject.backend.comment.dto.QuestionCommentDto;
import com.preproject.backend.comment.entity.QuestionComment;
import com.preproject.backend.comment.mapper.QuestionCommentMapper;
import com.preproject.backend.comment.service.QuestionCommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/question-comments")
@Validated
public class QuestionCommentController {
    private final QuestionCommentService questioncommentService;
    private final QuestionCommentMapper mapper;

    public QuestionCommentController(QuestionCommentService questioncommentService, QuestionCommentMapper mapper) {
        this.questioncommentService = questioncommentService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity PostQuestionComment(@Valid @RequestBody QuestionCommentDto.Post requestBody) {
        QuestionComment questioncomment = questioncommentService.createComment(mapper.CommentPostDtoToComment(requestBody));

        return new ResponseEntity<>(mapper.CommentToCommentResponseDto(questioncomment), HttpStatus.CREATED);
    }

    @PatchMapping("/{question-comment-id}")
    public ResponseEntity PatchQuestionComment(@Positive @PathVariable("question-comment-id") long id,
                                         @Valid @RequestBody QuestionCommentDto.Patch requestBody) {
        requestBody.setId(id);
        QuestionComment questioncomment = questioncommentService.updateComment(mapper.CommentPatchDtoToComment(requestBody));

        return new ResponseEntity<>(mapper.CommentToCommentResponseDto(questioncomment), HttpStatus.OK);
    }

    @DeleteMapping("/{question-comment-id}")
    public void deleteQuestionComment(@Positive @PathVariable("question-comment-id") long id) {
        questioncommentService.deleteComment(id);
    }
}
