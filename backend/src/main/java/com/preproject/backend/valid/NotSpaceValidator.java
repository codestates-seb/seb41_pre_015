package com.preproject.backend.valid;

import org.springframework.util.StringUtils;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class NotSpaceValidator implements ConstraintValidator<NotSpace, String> {
    @Override
    public void initialize(NotSpace constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return value == null || value.length() == 0 || StringUtils.hasText(value);
    }
}
