package com.preproject.backend.question.mapper;

import com.preproject.backend.member.entity.Member;
import com.preproject.backend.question.dto.QuestionDto;
import com.preproject.backend.question.dto.QuestionVoteDto;
import com.preproject.backend.question.entity.Question;
import com.preproject.backend.question.entity.QuestionVote;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

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

    QuestionVote questionVoteDtoToQuestionVote(QuestionVoteDto requestBody);

    Question questionPatchDtoToQuestion(QuestionDto.Patch questionPatchDto);

    @Mapping(source = "member.id", target = "memberId")
    QuestionDto.Response questionToQuestionResponseDto(Question question);


    List<QuestionDto.Response> questionToQuestionResponseDtos(List<Question> questions);
}
