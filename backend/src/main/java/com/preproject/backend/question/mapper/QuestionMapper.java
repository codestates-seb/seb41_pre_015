package com.preproject.backend.question.mapper;


import com.preproject.backend.question.dto.QuestionDto;
import com.preproject.backend.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import java.util.List;

import com.preproject.backend.comment.dto.AnswerCommentDto;
import com.preproject.backend.comment.dto.QuestionCommentDto;
import com.preproject.backend.comment.entity.AnswerComment;
import com.preproject.backend.comment.entity.QuestionComment;
import com.preproject.backend.question.dto.QuestionDto;
import com.preproject.backend.question.dto.QuestionVoteDto;
import com.preproject.backend.question.entity.Question;
import com.preproject.backend.question.entity.QuestionVote;
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
		questionResponseDto.setMemberName(question.getMember().getName());
		questionResponseDto.setTitle(question.getTitle());
		questionResponseDto.setContent(question.getContent());
		questionResponseDto.setCreatedAt(question.getCreatedAt());
		questionResponseDto.setModifiedAt(question.getModifiedAt());
		questionResponseDto.setQuestionStatus(question.getQuestionStatus());
		questionResponseDto.setScore(question.getScore());

		List<Answer> answers = question.getQuestionAnswers();
		questionResponseDto.setAnswer(answersToAnswerResponseDtos(answers));

		List<QuestionComment> questionComments = question.getQuestionComments();
		questionResponseDto.setQuestionComments(questionCommentsToQuestionCommentResponseDtos(questionComments));
		return questionResponseDto;

	}

  QuestionVote questionVoteDtoToQuestionVote(QuestionVoteDto requestBody);

	List<QuestionDto.Response> questionToQuestionResponseDtos(List<Question> questions);

	List<AnswerDto.Response> answersToAnswerResponseDtos(List<Answer> answers);

	List<QuestionCommentDto.Response> questionCommentsToQuestionCommentResponseDtos(List<QuestionComment> questionComments);

	@Mappings({@Mapping(source = "member.id", target = "memberId"),
		@Mapping(source = "question.id", target = "questionId")})
	AnswerDto.Response answerToAnswerResponseDto(Answer answer);

	@Mappings({@Mapping(source = "member.id", target = "memberId"),
			@Mapping(source = "question.id", target = "questionId")})
	QuestionCommentDto.Response questionCommentToQuestionCommentResponseDto(QuestionComment questionComment);

	List<AnswerCommentDto.Response> answerCommentsToAnswerCommentResponseDtos(List<AnswerComment> answerComments);
	@Mappings({@Mapping(source = "member.id", target = "memberId"),
			@Mapping(source = "answer.id", target = "answerId")})
	AnswerCommentDto.Response answerCommentToAnswerCommentResponseDto(AnswerComment answerComment);
}
