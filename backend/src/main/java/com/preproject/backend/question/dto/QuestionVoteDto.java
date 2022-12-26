package com.preproject.backend.question.dto;

import lombok.Getter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Getter
public class QuestionVoteDto {
    private Long questionId;
    @Positive
    @NotNull
    private Long memberId;

}
