package com.preproject.backend.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

public class QuestionCommentDto {

    @Getter
    public static class Post {
        @NotBlank
        private String content;

        @Positive
        private Long questionId;

        @Positive
        private Long memberId;
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
        private Long id;
        private Long questionId;
        private Long memberId;
        private String memberName;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}
