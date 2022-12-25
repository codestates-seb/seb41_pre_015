package com.preproject.backend.question.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.preproject.backend.audit.Auditable;
import com.preproject.backend.comment.entity.QuestionComment;
import com.preproject.backend.member.entity.Member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
public class Question extends Auditable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(length = 255, nullable = false)
	private String title;

	@Column(length = 255, nullable = false)
	private String content;

	@Column
	private int score;

	@Enumerated(value = EnumType.STRING)
	@Column(nullable = false)
	private QuestionStatus questionStatus = QuestionStatus.UNRESOLVED;

	// 질문 ~ 회원
	@ManyToOne
	@JoinColumn(name = "member_id")
	@JsonIgnore //JPA 무한 참조순환으로 인한 어노테이션 추가
		Member member;

	// 질문 ~ 코멘트 (양방향)
	@OneToMany(mappedBy = "question", cascade = CascadeType.REMOVE)
	private List<QuestionComment> questionComments = new ArrayList<>();

	public enum QuestionStatus {
		RESOLVED("채택 완료"),
		UNRESOLVED("미해결");
		@Getter
		private String status;

		QuestionStatus(String status) {
			this.status = status;
		}
	}
}
