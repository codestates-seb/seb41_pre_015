package com.preproject.backend.answer.service;

import com.preproject.backend.answer.entity.Answer;
import com.preproject.backend.answer.entity.AnswerVote;
import com.preproject.backend.answer.repository.AnswerRepository;
import com.preproject.backend.answer.repository.AnswerVoteRepository;
import com.preproject.backend.exception.BusinessLogicException;
import com.preproject.backend.exception.ExceptionCode;
import com.preproject.backend.member.entity.Member;
import com.preproject.backend.member.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AnswerVoteService {
    private final AnswerRepository answerRepository;
    private final MemberRepository memberRepository;
    private final AnswerVoteRepository answerVoteRepository;

    public AnswerVoteService(AnswerRepository answerRepository,
                             MemberRepository memberRepository,
                             AnswerVoteRepository answerVoteRepository) {
        this.answerRepository = answerRepository;
        this.memberRepository = memberRepository;
        this.answerVoteRepository = answerVoteRepository;
    }

    public Answer upVoteAnswer(long answerId, AnswerVote answerVote) {
        Answer verifiedAnswer = findVerifiedAnswer(answerId);// db 저장된 답변

        AnswerVote findAnswerVote = answerVoteRepository.findByAnswerAndMemberId(verifiedAnswer, answerVote.getMemberId());

        if (findAnswerVote == null) {
            findAnswerVote = new AnswerVote();
            findAnswerVote.setAnswer(verifiedAnswer);
            findAnswerVote.setMemberId(answerVote.getMemberId());
            findAnswerVote.setAnswerVoteStatus(AnswerVote.AnswerVoteStatus.UP);
            verifiedAnswer.setScore(verifiedAnswer.getScore() + 1);
            answerVoteRepository.save(findAnswerVote);
            answerRepository.save(verifiedAnswer);
        }
        else if (findAnswerVote.getAnswerVoteStatus() == AnswerVote.AnswerVoteStatus.DOWN) {
            verifiedAnswer.setScore(verifiedAnswer.getScore() + 1);
            answerVoteRepository.delete(findAnswerVote);
            answerRepository.save(verifiedAnswer);
        }
        else if (findAnswerVote.getAnswerVoteStatus() == AnswerVote.AnswerVoteStatus.UP) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_ALREADY_VOTED);
        }

        return verifiedAnswer;
    }

    public Answer downVoteAnswer(long answerId, AnswerVote answerVote) {
        Answer verifiedAnswer = findVerifiedAnswer(answerId);// db 저장된 답변

        AnswerVote findAnswerVote = answerVoteRepository.findByAnswerAndMemberId(verifiedAnswer, answerVote.getMemberId());

        if (findAnswerVote == null) {
            findAnswerVote = new AnswerVote();
            findAnswerVote.setAnswer(verifiedAnswer);
            findAnswerVote.setMemberId(answerVote.getMemberId());
            findAnswerVote.setAnswerVoteStatus(AnswerVote.AnswerVoteStatus.DOWN);
            verifiedAnswer.setScore(verifiedAnswer.getScore() - 1);
            answerVoteRepository.save(findAnswerVote);
            answerRepository.save(verifiedAnswer);
        }
        else if (findAnswerVote.getAnswerVoteStatus() == AnswerVote.AnswerVoteStatus.UP) {
            verifiedAnswer.setScore(verifiedAnswer.getScore() - 1);
            answerVoteRepository.delete(findAnswerVote);
            answerRepository.save(verifiedAnswer);
        }
        else if (findAnswerVote.getAnswerVoteStatus() == AnswerVote.AnswerVoteStatus.DOWN) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_ALREADY_VOTED);
        }

        return verifiedAnswer;
    }

    public Answer findVerifiedAnswer(long id) {
        Optional<Answer> optionalAnswer =
                answerRepository.findById(id);
        Answer verifiedAnswer =
                optionalAnswer.orElseThrow(() ->
                        new RuntimeException("Answer Not Found")); //리펙토링 필요
        return verifiedAnswer;
    }
}
