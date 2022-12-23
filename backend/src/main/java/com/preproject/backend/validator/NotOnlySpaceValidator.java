package com.preproject.backend.validator;

import org.springframework.util.StringUtils;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class NotOnlySpaceValidator implements ConstraintValidator<NotOnlySpace, String> {
    @Override
    public void initialize(NotOnlySpace constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return value == null || value.length() == 0 || StringUtils.hasText(value);
    }
}
