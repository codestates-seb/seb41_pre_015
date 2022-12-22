package com.preproject.backend.answer.service;

import com.preproject.backend.answer.entity.Answer;
import com.preproject.backend.answer.repository.AnswerRepository;
import com.preproject.backend.utils.CustomBeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * exception 패키지 필요
 */
@Service
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final CustomBeanUtils beanUtils;

    public AnswerService(AnswerRepository answerRepository, CustomBeanUtils customBeanUtils) {
        this.answerRepository = answerRepository;
        this.beanUtils = customBeanUtils;
    }

    public Answer createAnswer(Answer answer) {
        //TODO 유효성 로직 추가 필요

        return answerRepository.save(answer);
    }

    public Answer updateAnswer(Answer answer) {
        Answer verifiedAnswer = findVerifiedAnswer(answer.getId());

        beanUtils.copyNonNullProperties(answer, verifiedAnswer);

        return verifiedAnswer;
    }

    public Page<Answer> findAnswers(int page, int size) {
        return answerRepository.findAll(PageRequest.of(page,size));
    }

    public void deleteAnswer(long id) {
        answerRepository.deleteById(id);
    }


    public Answer findVerifiedAnswer(long id) {
        Optional<Answer> optionalAnswer =
                answerRepository.findById(id);
        Answer verifiedAnswer =
                optionalAnswer.orElseThrow(() ->
                        new RuntimeException("Answer Not Found"));
        return verifiedAnswer;
    }
}
