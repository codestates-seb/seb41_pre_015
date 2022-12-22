package com.preproject.backend.answer.dto;

import com.preproject.backend.answer.entity.Answer;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

public class AnswerDto {
    @Getter
    public static class Post {
        @NotBlank(message = "내용은 공백이 아니어야 합니다.")
        private String content;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        private Long id;
        @NotBlank(message = "내용은 공백이 아니어야 합니다.")
        private String content;
        private Answer.AnswerStatus answerStatus;

        public void setId(Long id) {
            this.id = id;
        }

    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private Long id;
        private String content;
        private int score;
        private Answer.AnswerStatus answerStatus;
    }
}
