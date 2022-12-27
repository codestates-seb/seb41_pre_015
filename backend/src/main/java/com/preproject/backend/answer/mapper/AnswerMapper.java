package com.preproject.backend.answer.mapper;

import com.preproject.backend.answer.dto.AnswerDto;
import com.preproject.backend.answer.dto.AnswerVoteDto;
import com.preproject.backend.answer.entity.Answer;
import com.preproject.backend.answer.entity.AnswerVote;
import com.preproject.backend.comment.dto.AnswerCommentDto;
import com.preproject.backend.comment.entity.AnswerComment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerMapper {
    @Mapping(source = "memberId", target = "member.id")
    @Mapping(source = "questionId", target = "question.id")
    Answer answerPostDtoToAnswer(AnswerDto.Post requestBody);

    AnswerVote answerVoteDtoToAnswerVote(AnswerVoteDto requestBody);

    Answer answerPatchDtoToAnswer(AnswerDto.Patch requestBody);
    @Mapping(source = "member.id", target = "memberId")
    @Mapping(source = "question.id", target = "questionId")
    default AnswerDto.Response answerToAnswerResponseDto(Answer answer) {
        if (answer == null) {
            return null;
        } else {
            AnswerDto.Response answerResponseDto = new AnswerDto.Response();

            answerResponseDto.setId(answer.getId());
            answerResponseDto.setMemberId(answer.getMember().getId());
            answerResponseDto.setQuestionId(answer.getQuestion().getId());
            answerResponseDto.setContent(answer.getContent());
            answerResponseDto.setCreatedAt(answer.getCreatedAt());
            answerResponseDto.setModifiedAt(answer.getModifiedAt());
            answerResponseDto.setAnswerStatus(answer.getAnswerStatus());
            answerResponseDto.setScore(answer.getScore());

            List<AnswerComment> answerComments = answer.getAnswerComments();
            answerResponseDto.setAnswerComments(answerCommentsToAnswerCommentResponseDtos(answerComments));

            return answerResponseDto;
        }
    };

    List<AnswerDto.Response> answerToAnswerResponseDtos(List<Answer> answers);
    List<AnswerCommentDto.Response> answerCommentsToAnswerCommentResponseDtos(List<AnswerComment> answerComments);
    @Mappings({@Mapping(source = "member.id", target = "memberId"),
            @Mapping(source = "answer.id", target = "answerId")})
    AnswerCommentDto.Response answerCommentToAnswerCommentResponseDto(AnswerComment answerComment);
}
