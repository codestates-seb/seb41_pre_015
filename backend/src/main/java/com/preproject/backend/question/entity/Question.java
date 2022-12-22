package com.preproject.backend.question.entity;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
 
@Setter
public class Question {
	private Long Id;
	private String title;
	private String content;
	private int score;
	private QuestionStatus status = QuestionStatus.UNRESOLVED;
	private LocalDateTime createdAt = LocalDateTime.now();
	private LocalDateTime modifiedAt = LocalDateTime.now();

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
