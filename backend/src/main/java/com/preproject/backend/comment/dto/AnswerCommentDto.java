package com.preproject.backend.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

public class AnswerCommentDto {

    @Getter
    public static class Post {
        @NotBlank
        private String content;

        @Positive
        @NotBlank
        private long answerId;

        @Positive
        @NotBlank
        private long memberId;
    }

    @Getter
    @AllArgsConstructor
    public static class Patch {
        private long id;

        @NotBlank(message = "내용은 공백이 아니어야 합니다.")
        private String content;

        public void setId(long id) {
            this.id = id;
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private long id;
        private long answerId;
        private long memberId;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}
