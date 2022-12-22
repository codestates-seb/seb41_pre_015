package com.preproject.backend.answer.mapper;

import com.preproject.backend.answer.dto.AnswerDto;
import com.preproject.backend.answer.entity.Answer;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AnswerMapper {

    Answer answerPostDtoToAnswer(AnswerDto.Post requestBody);
    Answer answerPatchDtoToAnswer(AnswerDto.Patch requestBody);
    AnswerDto.Response answerToAnswerResponseDto(Answer answer);
}
