package com.preproject.backend.question.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.preproject.backend.question.entity.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
	//List<Question> findByTitleContaining(String searchKeyword, Pageable pageable);
}



