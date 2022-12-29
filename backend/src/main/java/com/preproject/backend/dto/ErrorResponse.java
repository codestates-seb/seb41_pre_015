package com.preproject.backend.dto;

import com.preproject.backend.exception.BusinessLogicException;
import com.preproject.backend.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Slf4j
public class ErrorResponse {
    //FIXME
    // 리팩토링 진행하기(ErrorResponse 추상화 진행 예상)
    private int status;
    private String message;
    private List<FieldBindingError> fieldBindingErrors;
    private List<ConstraintViolationError> constraintViolationErrors;

    private ErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }

    private ErrorResponse(List<FieldBindingError> fieldBindingErrors, List<ConstraintViolationError> constraintViolationErrors) {
        this.fieldBindingErrors = fieldBindingErrors;
        this.constraintViolationErrors = constraintViolationErrors;
        this.status = HttpStatus.BAD_REQUEST.value();
    }

    public static ErrorResponse of(BusinessLogicException e) {
        ExceptionCode exceptionCode = e.getExceptionCode();
        return new ErrorResponse(exceptionCode.getStatus(), exceptionCode.getMessage());
    }

    public static ErrorResponse of(MethodArgumentNotValidException e) {
        BindingResult bindingResult = e.getBindingResult();
        return new ErrorResponse(FieldBindingError.of(bindingResult), null);
    }

    public static ErrorResponse of(ConstraintViolationException e) {
        Set<ConstraintViolation<?>> constraintViolations = e.getConstraintViolations();
        return new ErrorResponse(null, ConstraintViolationError.of(constraintViolations));
    }

    public static ErrorResponse of(MethodArgumentTypeMismatchException e) {
//        log.info("e.getName()={}", e.getName());
//        log.info("e.getRequiredType()={}", e.getRequiredType());
//        log.info("e.getRequiredType().getSimpleName()={}", Objects.requireNonNull(e.getRequiredType()).getSimpleName());
//        log.info("e.getPropertyName()={}", e.getPropertyName());
//        log.info("e.getMessage()={}, e.getLocalizedMessage()={}", e.getMessage(), e.getLocalizedMessage());
//        log.info("e.getParameter={}, e.getValue={}", e.getParameter(), e.getValue());
//        log.info("e.getParameter().getParameter()={}", e.getParameter().getParameter());
//        log.info("e.getParameter().getParameter().getType()={}", e.getParameter().getParameter().getType());
        String name = e.getName();
        String simpleName = Objects.requireNonNull(e.getRequiredType()).getSimpleName();
        String message = String.format("%s은 %s 타입이어야 합니다.", name, simpleName);
        return new ErrorResponse(HttpStatus.BAD_REQUEST.value(), message);
    }

    public static ErrorResponse of(HttpRequestMethodNotSupportedException e) {
        HttpStatus methodNotAllowed = HttpStatus.METHOD_NOT_ALLOWED;
        return new ErrorResponse(methodNotAllowed.value(), methodNotAllowed.getReasonPhrase());
    }

    public static ErrorResponse of(MissingServletRequestParameterException e) {
        //FIXME
        // 누락된 쿼리 파라미터 이름 보여주기
//        e.getParameterName()
//        e.getParameterType()
        return new ErrorResponse(HttpStatus.BAD_REQUEST.value(),
                "쿼리 파라미터가 누락되었습니다.");
    }

    public static ErrorResponse of(MissingPathVariableException e) {
        return new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "@RequestMapping의 URI템플릿이 컨트롤러의 메서드 매개 변수에 선언된 경로 변수 이름과 일치하지 않습니다.");
    }

    public static ErrorResponse of(HttpMessageNotReadableException e) {
        return new ErrorResponse(HttpStatus.BAD_REQUEST.value(), "필수 HTTP 요청 메세지의 바디 내용이 누락되었습니다.");
    }

    public static ErrorResponse of(HttpStatus httpStatus) {
        int status = httpStatus.value();
        String reasonPhrase = httpStatus.getReasonPhrase();
        return new ErrorResponse(status, reasonPhrase);
    }

    @Getter
    @AllArgsConstructor
    public static class FieldBindingError {
        private String field;
        private Object rejectedValue;
        private String reason;

        public static List<FieldBindingError> of(BindingResult bindingResult) {
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();
            return fieldErrors.stream()
                    .map(fieldError -> new FieldBindingError(
                            fieldError.getField(),
                            fieldError.getRejectedValue() == null ? "" : fieldError.getRejectedValue().toString(),
                            fieldError.getDefaultMessage()))
                    .collect(Collectors.toList());
        }
    }

    @Getter
    @AllArgsConstructor
    public static class ConstraintViolationError {
        private String propertyPath;
        private Object rejectedValue;
        private String reason;

        public static List<ConstraintViolationError> of(Set<ConstraintViolation<?>> constraintViolations) {
            return constraintViolations.stream()
                    .map(constraintViolation -> new ConstraintViolationError(
                            constraintViolation.getPropertyPath().toString(),
                            constraintViolation.getInvalidValue().toString(),
                            constraintViolation.getMessage()
                    ))
                    .collect(Collectors.toList());
        }
    }
}
