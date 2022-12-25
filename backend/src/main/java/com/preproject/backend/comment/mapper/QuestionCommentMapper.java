package com.preproject.backend.comment.mapper;

import com.preproject.backend.comment.dto.QuestionCommentDto;
import com.preproject.backend.comment.entity.QuestionComment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface QuestionCommentMapper {
    @Mapping(source = "memberId", target = "member.id")
    @Mapping(source = "questionId", target = "question.id")
    QuestionComment QuestionCommentPostDtoToQuestionComment(QuestionCommentDto.Post requestBody);
    QuestionComment QuestionCommentPatchDtoToQuestionComment(QuestionCommentDto.Patch requestBody);
    @Mapping(source = "member.id", target = "memberId")
    @Mapping(source = "question.id", target = "questionId")
    QuestionCommentDto.Response QuestionCommentToQuestionCommentResponseDto(QuestionComment questioncomment);
}
