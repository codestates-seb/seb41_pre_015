package com.preproject.backend.comment.mapper;

import com.preproject.backend.comment.dto.AnswerCommentDto;
import com.preproject.backend.comment.dto.QuestionCommentDto;
import com.preproject.backend.comment.entity.AnswerComment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AnswerCommentMapper {
    @Mapping(source = "memberId", target = "member.id")
    @Mapping(source = "answerId", target = "answer.id")
    AnswerComment AnswerCommentPostDtoToAnswerComment(AnswerCommentDto.Post requestBody);

    AnswerComment AnswerCommentPatchDtoToAnswerComment(AnswerCommentDto.Patch requestBody);

    @Mapping(source = "member.id", target = "memberId")
    @Mapping(source = "answer.id", target = "answerId")
    default AnswerCommentDto.Response AnswerCommentToAnswerCommentResponseDto(AnswerComment answercomment){

        AnswerCommentDto.Response answerCommentDto = new AnswerCommentDto.Response();
        answerCommentDto.setId(answercomment.getId());
        answerCommentDto.setAnswerId(answercomment.getAnswer().getId());
        answerCommentDto.setMemberId(answercomment.getMember().getId());
        answerCommentDto.setMemberName(answercomment.getMember().getName());
        answerCommentDto.setContent(answercomment.getContent());
        answerCommentDto.setCreatedAt(answercomment.getCreatedAt());
        answerCommentDto.setModifiedAt(answercomment.getModifiedAt());

        return answerCommentDto;
    }
}
