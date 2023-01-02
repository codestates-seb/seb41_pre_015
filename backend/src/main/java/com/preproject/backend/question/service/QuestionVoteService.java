package com.preproject.backend.question.service;

import com.preproject.backend.answer.entity.Answer;
import com.preproject.backend.answer.entity.AnswerVote;
import com.preproject.backend.answer.repository.AnswerRepository;
import com.preproject.backend.answer.repository.AnswerVoteRepository;
import com.preproject.backend.exception.BusinessLogicException;
import com.preproject.backend.exception.ExceptionCode;
import com.preproject.backend.member.repository.MemberRepository;
import com.preproject.backend.question.entity.Question;
import com.preproject.backend.question.entity.QuestionVote;
import com.preproject.backend.question.repository.QuestionRepository;
import com.preproject.backend.question.repository.QuestionVoteRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class QuestionVoteService {
    private final QuestionRepository questionRepository;
    private final MemberRepository memberRepository;
    private final QuestionVoteRepository questionVoteRepository;

    public QuestionVoteService(QuestionRepository questionRepository,
                               MemberRepository memberRepository,
                               QuestionVoteRepository questionVoteRepository) {
        this.questionRepository = questionRepository;
        this.memberRepository = memberRepository;
        this.questionVoteRepository = questionVoteRepository;
    }

    public Question upVoteQuestion(long questionId, QuestionVote questionVote) {
        Question verifiedQuestion = findVerifiedQuestion(questionId);   // db 저장된 질문

        QuestionVote findQuestionVote = questionVoteRepository.findByQuestionAndMemberId(verifiedQuestion, questionVote.getMemberId());

        if (findQuestionVote == null) {
            findQuestionVote = new QuestionVote();
            findQuestionVote.setQuestion(verifiedQuestion);
            findQuestionVote.setMemberId(questionVote.getMemberId());
            findQuestionVote.setQuestionVoteStatus(QuestionVote.QuestionVoteStatus.UP);
            verifiedQuestion.setScore(verifiedQuestion.getScore() + 1);
            questionVoteRepository.save(findQuestionVote);
            questionRepository.save(verifiedQuestion);
        }
        else if (findQuestionVote.getQuestionVoteStatus() == QuestionVote.QuestionVoteStatus.DOWN) {
            verifiedQuestion.setScore(verifiedQuestion.getScore() + 1);
            questionVoteRepository.delete(findQuestionVote);
            questionRepository.save(verifiedQuestion);
        }
        else if (findQuestionVote.getQuestionVoteStatus() == QuestionVote.QuestionVoteStatus.UP) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_ALREADY_VOTED);
        }

        return verifiedQuestion;
    }

    public Question downVoteQuestion(long questionId, QuestionVote questionVote) {
        Question verifiedQuestion = findVerifiedQuestion(questionId);// db 저장된 답변

        QuestionVote findQuestionVote = questionVoteRepository.findByQuestionAndMemberId(verifiedQuestion, questionVote.getMemberId());

        if (findQuestionVote == null) {
            findQuestionVote = new QuestionVote();
            findQuestionVote.setQuestion(verifiedQuestion);
            findQuestionVote.setMemberId(questionVote.getMemberId());
            findQuestionVote.setQuestionVoteStatus(QuestionVote.QuestionVoteStatus.DOWN);
            verifiedQuestion.setScore(verifiedQuestion.getScore() - 1);
            questionVoteRepository.save(findQuestionVote);
            questionRepository.save(verifiedQuestion);
        }
        else if (findQuestionVote.getQuestionVoteStatus() == QuestionVote.QuestionVoteStatus.UP) {
            verifiedQuestion.setScore(verifiedQuestion.getScore() - 1);
            questionVoteRepository.delete(findQuestionVote);
            questionRepository.save(verifiedQuestion);

        }
        else if (findQuestionVote.getQuestionVoteStatus() == QuestionVote.QuestionVoteStatus.DOWN) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_ALREADY_VOTED);
        }

        return verifiedQuestion;
    }

    public Question findVerifiedQuestion(long id) {
        Optional<Question> optionalQuestion =
                questionRepository.findById(id);
        Question verifiedQuestion =
                optionalQuestion.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND)); //리펙토링 필요
        return verifiedQuestion;
    }
}
