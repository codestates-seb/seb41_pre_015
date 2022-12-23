package com.preproject.backend.comment.repository;

import com.preproject.backend.comment.entity.AnswerComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerCommentRepository extends JpaRepository<AnswerComment, Long> {
}
