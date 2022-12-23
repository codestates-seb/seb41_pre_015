package com.preproject.backend.comment.controller;

import com.preproject.backend.comment.dto.CommentDto;
import com.preproject.backend.comment.entity.Comment;
import com.preproject.backend.comment.mapper.CommentMapper;
import com.preproject.backend.comment.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/comments")
@Validated
public class CommentController {
    private final CommentService commentService;
    private final CommentMapper mapper;

    public CommentController(CommentService commentService, CommentMapper mapper) {
        this.commentService = commentService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity PostComment(@Valid @RequestBody CommentDto.Post requestBody) {
        Comment comment = commentService.createComment(mapper.CommentPostDtoToComment(requestBody));

        return new ResponseEntity<>(mapper.CommentToCommentResponseDto(comment), HttpStatus.CREATED);
    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity PatchComment(@Positive @PathVariable("comment-id") long id,
                                         @Valid @RequestBody CommentDto.Patch requestBody) {
        requestBody.setId(id);
        Comment comment = commentService.updateComment(mapper.CommentPatchDtoToComment(requestBody));

        return new ResponseEntity<>(mapper.CommentToCommentResponseDto(comment), HttpStatus.OK);
    }

    @DeleteMapping("/{comment-id}")
    public void deleteComment(@Positive @PathVariable("comment-id") long id) {
        commentService.deleteComment(id);
    }
}
