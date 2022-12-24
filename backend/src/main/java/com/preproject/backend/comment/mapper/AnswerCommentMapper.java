package com.preproject.backend.comment.mapper;

import com.preproject.backend.comment.dto.AnswerCommentDto;
import com.preproject.backend.comment.entity.AnswerComment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AnswerCommentMapper {
    AnswerComment CommentPostDtoToComment(AnswerCommentDto.Post requestBody);
    AnswerComment CommentPatchDtoToComment(AnswerCommentDto.Patch requestBody);
    AnswerCommentDto.Response CommentToCommentResponseDto(AnswerComment answercomment);
}
