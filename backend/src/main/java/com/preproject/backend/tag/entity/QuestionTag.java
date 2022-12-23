package com.preproject.backend.tag.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.preproject.backend.question.entity.Question;

@Entity
public class QuestionTag {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// 질문태그 ~ 질문
	@ManyToOne
	@JoinColumn(name = "question_id")
	Question question;

	// 질문태그 ~ 태그
	@ManyToOne
	@JoinColumn(name = "tag_id")
	Tag tag;
}
