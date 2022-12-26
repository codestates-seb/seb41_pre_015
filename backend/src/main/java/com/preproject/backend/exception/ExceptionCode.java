package com.preproject.backend.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(NOT_FOUND.value(), "Member Not Found"),
    MEMBER_ALREADY_EXISTS(CONFLICT.value(), "Member Already Exists"),
    ANSWER_NOT_FOUND(NOT_FOUND.value(), "Answer Not Found"),
    QUESTION_NOT_FOUND(NOT_FOUND.value(), "Question Not Found"),
    VOTED(CONFLICT.value(), "Already Voted");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
