package com.preproject.backend.question.repository;

import com.preproject.backend.question.entity.Question;
import com.preproject.backend.question.entity.QuestionVote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionVoteRepository extends JpaRepository<QuestionVote, Long> {
    QuestionVote findByQuestionAndMemberId(Question question, long memberId);
}
