package com.preproject.backend.answer.dto;

import com.preproject.backend.answer.entity.Answer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class AnswerDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        private String content;

        public Post() {
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        private Long id;
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
