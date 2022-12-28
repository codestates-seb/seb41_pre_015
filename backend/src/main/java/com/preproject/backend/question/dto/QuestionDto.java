package com.preproject.backend.question.dto;

import java.time.LocalDateTime;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import com.preproject.backend.answer.dto.AnswerDto;
import com.preproject.backend.comment.dto.QuestionCommentDto;
import com.preproject.backend.question.entity.Question;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class QuestionDto {
	// *** PostDto ***
	@Getter
	@AllArgsConstructor
	public static class Post {
		@NotBlank(message = "제목은 공백이 아니어야 합니다.")
		private String title;

		@NotBlank(message = "내용은 공백이 아니어야 합니다.")
		private String content;

		@Positive
		@NotNull
		private Long memberId;

		//Private List<Tag> tags;

	}

	// *** PatchDto ***
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

	// *** ResponseDto ***
	@Getter
	@Setter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Response {
		private Long id;
		private Long memberId;
		private String title;
		private String content;
		private int score;
		private Question.QuestionStatus questionStatus;
		private LocalDateTime createdAt;
		private LocalDateTime modifiedAt;

		private List<AnswerDto.Response> answer;
		private List<QuestionCommentDto.Response> questionComments;

		public String getQuestionStatus() {
			return questionStatus.getStatus();
		}
	}
}
