package com.preproject.backend.answer.dto;

import com.preproject.backend.answer.entity.Answer;
import com.preproject.backend.comment.dto.AnswerCommentDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.List;

public class AnswerDto {
    @Getter
    public static class Post {
        @NotBlank(message = "내용은 공백이 아니어야 합니다.")
        private String content;

        @Positive
        private long memberId;

        @Positive
        private long questionId;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        private Long id;
        @NotBlank(message = "내용은 공백이 아니어야 합니다.")
        private String content;

        public void setId(Long id) {
            this.id = id;
        }

    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private long id;
        private long memberId;
        private long questionId;
        private String content;
        private int score;
        private Answer.AnswerStatus answerStatus;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private List<AnswerCommentDto.Response> answerComments;
    }
}
