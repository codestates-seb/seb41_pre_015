package com.preproject.backend.answer.mapper;

import com.preproject.backend.answer.dto.AnswerDto;
import com.preproject.backend.answer.entity.Answer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerMapper {
    @Mapping(source = "memberId", target = "member.id")
    @Mapping(source = "questionId", target = "question.id")
    Answer answerPostDtoToAnswer(AnswerDto.Post requestBody);
    Answer answerPatchDtoToAnswer(AnswerDto.Patch requestBody);
    @Mapping(source = "member.id", target = "memberId")
    @Mapping(source = "question.id", target = "questionId")
    AnswerDto.Response answerToAnswerResponseDto(Answer answer);
    List<AnswerDto.Response> answerToAnswerResponseDtos(List<Answer> answers);
}
