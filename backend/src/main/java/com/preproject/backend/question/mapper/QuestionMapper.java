package com.preproject.backend.question.mapper;

import java.util.List;

import com.preproject.backend.question.dto.QuestionDto;
import com.preproject.backend.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.ReportingPolicy;

import com.preproject.backend.answer.dto.AnswerDto;
import com.preproject.backend.answer.entity.Answer;
import com.preproject.backend.question.dto.QuestionDto;
import com.preproject.backend.question.entity.Question;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionMapper {

	@Mapping(source = "memberId", target = "member.id")
	Question questionPostDtoToQuestion(QuestionDto.Post questionPostDto);

	//    default Question questionPostDtoToQuestion(QuestionDto.Post questionPostDto) {
	//        Question question = new Question();
	//        Member member = new Member();
	//        member.setId(questionPostDto.getMemberId());
	//
	//        question.setMember(member);
	//        question.setTitle(questionPostDto.getTitle());
	//        question.setContent(questionPostDto.getContent());
	//
	//        return question;
	//    }

	Question questionPatchDtoToQuestion(QuestionDto.Patch questionPatchDto);

	@Mapping(source = "member.id", target = "memberId")
	default QuestionDto.Response questionToQuestionResponseDto(Question question) {

		QuestionDto.Response questionResponseDto = new QuestionDto.Response();

		questionResponseDto.setId(question.getId());
		questionResponseDto.setMemberId(question.getMember().getId());
		questionResponseDto.setTitle(question.getTitle());
		questionResponseDto.setContent(question.getContent());
		questionResponseDto.setCreatedAt(question.getCreatedAt());
		questionResponseDto.setModifiedAt(question.getModifiedAt());
		questionResponseDto.setQuestionStatus(question.getQuestionStatus());
		questionResponseDto.setScore(question.getScore());

		List<Answer> answers = question.getQuestionAnswers();
		questionResponseDto.setAnswer(answersToAnswerResponseDtos(answers));

		return questionResponseDto;
	}

	List<QuestionDto.Response> questionToQuestionResponseDtos(List<Question> questions);

	List<AnswerDto.Response> answersToAnswerResponseDtos(List<Answer> answers);

	@Mappings({@Mapping(source = "member.id", target = "memberId"),
		@Mapping(source = "question.id", target = "questionId")})
	AnswerDto.Response answerToAnswerResponseDto(Answer answer);
}
