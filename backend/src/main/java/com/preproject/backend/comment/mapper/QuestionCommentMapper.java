package com.preproject.backend.comment.mapper;

import com.preproject.backend.comment.dto.QuestionCommentDto;
import com.preproject.backend.comment.entity.QuestionComment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface QuestionCommentMapper {
    QuestionComment CommentPostDtoToComment(QuestionCommentDto.Post requestBody);
    QuestionComment CommentPatchDtoToComment(QuestionCommentDto.Patch requestBody);
    QuestionCommentDto.Response CommentToCommentResponseDto(QuestionComment questioncomment);
}
