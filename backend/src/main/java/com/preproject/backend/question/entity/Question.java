package com.preproject.backend.question.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.preproject.backend.audit.Auditable;
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

	private LocalDateTime createdAt = LocalDateTime.now();
	private LocalDateTime modifiedAt = LocalDateTime.now();

	// 질문 ~ 회원
	@ManyToOne
	@JoinColumn(name = "member-id")
	Member member;

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
