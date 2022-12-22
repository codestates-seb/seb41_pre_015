package com.preproject.backend.question.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import com.preproject.backend.question.dto.QuestionDto;
import com.preproject.backend.question.entity.Question;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionMapper {
	Question questionPostDtoToQuestion(QuestionDto.Post questionPostDto);

	Question questionPatchDtoToQuestion(QuestionDto.Patch questionPatchDto);

	QuestionDto.Response questionToQuestionResponseDto(Question question);

	List<QuestionDto.Response> questionToQuestionResponseDtos(List<Question> questions);
}
