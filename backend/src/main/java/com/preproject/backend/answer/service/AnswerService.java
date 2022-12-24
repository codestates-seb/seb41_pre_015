package com.preproject.backend.answer.service;

import com.preproject.backend.answer.entity.Answer;
import com.preproject.backend.answer.repository.AnswerRepository;
import com.preproject.backend.utils.CustomBeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
        return answerRepository.findAll(PageRequest.of(page,size,
                Sort.by("id").descending()));
    }

    public void deleteAnswer(long id) {
        Answer verifiedAnswer = findVerifiedAnswer(id);

        answerRepository.delete(verifiedAnswer);
    }


    public Answer findVerifiedAnswer(long id) {
        Optional<Answer> optionalAnswer =
                answerRepository.findById(id);
        Answer verifiedAnswer =
                optionalAnswer.orElseThrow(() ->
                        new RuntimeException("Answer Not Found")); //리펙토링 필요
        return verifiedAnswer;
    }
}
