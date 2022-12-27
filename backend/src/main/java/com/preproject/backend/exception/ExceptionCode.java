package com.preproject.backend.exception;

import static org.springframework.http.HttpStatus.*;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(NOT_FOUND.value(), "Member Not Found"),
    MEMBER_ALREADY_EXISTS(CONFLICT.value(), "Member Already Exists"),
    QUESTION_NOT_FOUND(NOT_FOUND.value(), "Question Not Found"),
    ANSWER_NOT_FOUND(NOT_FOUND.value(), "Answer Not Found"),
	ANSWER_COMMENT_NOT_FOUND(NOT_FOUND.value(), "AnswerComment Not Found"),
	QUESTION_COMMENT_NOT_FOUND(NOT_FOUND.value(), "QuestionComment Not Found");

	@Getter
	private int status;

	@Getter
	private String message;

	ExceptionCode(int status, String message) {
		this.status = status;
		this.message = message;
	}
}
