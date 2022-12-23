package com.preproject.backend.question.dto;

import java.time.LocalDateTime;

import javax.validation.constraints.NotBlank;

import com.preproject.backend.question.entity.Question;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class QuestionDto {
	// PostDto
	@Getter
	@AllArgsConstructor
	public static class Post {
		@NotBlank(message = "제목은 공백이 아니어야 합니다.")
		private String title;

		@NotBlank(message = "내용은 공백이 아니어야 합니다.")
		private String content;

		//Private List<Tag> tags;

	}

	// PatchDto
	@Getter
	@Setter
	@AllArgsConstructor
	public static class Patch {
		private Long id;
		@NotBlank(message = "제목은 공백이 아니어야 합니다.")
		private String title;

		@NotBlank(message = "내용은 공백이 아니어야 합니다.")
		private String content;
	}

	// ResponseDto
	@Getter
	@AllArgsConstructor
	public static class Response {
		private Long id;
		private String title;
		private String content;
		private LocalDateTime createdAt;
		private LocalDateTime modifiedAt;
		private Question.QuestionStatus questionStatus;

		public String getQuestionStatus() {
			return questionStatus.getStatus();
		}
	}
}