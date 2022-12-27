package com.preproject.backend.answer.repository;

import com.preproject.backend.answer.entity.Answer;
import com.preproject.backend.answer.entity.AnswerVote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerVoteRepository extends JpaRepository<AnswerVote, Long> {
    AnswerVote findByAnswerAndMemberId(Answer answer, long memberId);
}
