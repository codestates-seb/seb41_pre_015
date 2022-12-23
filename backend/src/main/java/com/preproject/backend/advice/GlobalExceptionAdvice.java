package com.preproject.backend.advice;

import com.preproject.backend.dto.ErrorResponse;
import com.preproject.backend.exception.BusinessLogicException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import javax.validation.ConstraintViolationException;

@RestControllerAdvice
public class GlobalExceptionAdvice {

    @ExceptionHandler
    public ResponseEntity handleBusinessLogicException(BusinessLogicException e) {
        ErrorResponse response = ErrorResponse.of(e);
        return new ResponseEntity(response, HttpStatus.valueOf(response.getStatus()));
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
    // reqeustBody를 통해 받은 json 데이터를 dto 객체와 바인딩(dto 유효성 검증)에 실패한 경우
        ErrorResponse response = ErrorResponse.of(e);

        return response;
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleConstraintViolationException(ConstraintViolationException e) {
    // Pathvariable로 받은 데이터가 유효성 검증에 실패했을 때
        ErrorResponse response = ErrorResponse.of(e);

        return response;
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    public ErrorResponse handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
    // 유효하지 않은 HTTP METHOD 요청을 보낸 경우
        ErrorResponse response = ErrorResponse.of(e);

        return response;
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException e) {
    // pathVariable 혹은 requestParam으로 받은 데이터의 타입과 컨트롤러 메서드 파라미터 타입 서로 다른 경우
        ErrorResponse response = ErrorResponse.of(e);

        return response;
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMissingServletRequestParameterException(MissingServletRequestParameterException e) {
    // requestParam으로 받을 쿼리 파라미터가 존재하지 않는 경우
        ErrorResponse response = ErrorResponse.of(e);

        return response;
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleMissingPathVariableException(MissingPathVariableException e) {
    // @RequestMapping의 URI템플릿과 컨트롤러의 메서드 매개 변수에 선언된 pathVariable 이름과 일치하지 않는 경우.
        ErrorResponse response = ErrorResponse.of(e);

        return response;
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {
    // 요청 메세지 바디의 내용을 읽을 수 없는 경우(요청 메세지의 바디가 비어있거나, json 문법 오류가 발생한 경우)
        ErrorResponse response = ErrorResponse.of(e);

        return response;
    }
}
