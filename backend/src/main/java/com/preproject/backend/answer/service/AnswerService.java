package com.preproject.backend.answer.service;

import com.preproject.backend.answer.entity.Answer;
import com.preproject.backend.answer.repository.AnswerRepository;
import com.preproject.backend.exception.BusinessLogicException;
import com.preproject.backend.exception.ExceptionCode;
import com.preproject.backend.question.repository.QuestionRepository;
import com.preproject.backend.utils.CustomBeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;

@Service
@Transactional
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final CustomBeanUtils beanUtils;

    private final QuestionRepository questionRepository;

    public AnswerService(AnswerRepository answerRepository, CustomBeanUtils customBeanUtils,
        QuestionRepository questionRepository) {
        this.answerRepository = answerRepository;
        this.beanUtils = customBeanUtils;
        this.questionRepository = questionRepository;
    }

    public Answer createAnswer(Answer answer) {
        //TODO 유효성 로직 추가 필요


        return answerRepository.save(answer);
    }

    public Answer updateAnswer(Answer answer) {
        Answer verifiedAnswer = findVerifiedAnswer(answer.getId());

        beanUtils.copyNonNullProperties(answer, verifiedAnswer);

        return answerRepository.save(verifiedAnswer);
    }

    // 최신순
    public Page<Answer> findLAnswers(int page, int size) {
        return answerRepository.findAll(PageRequest.of(page,size,
                Sort.by("id").descending()));
    }

    // 추천순
    public Page<Answer> findHAnswers(int page, int size) {
        return answerRepository.findAll(PageRequest.of(page,size,
            Sort.by("score").descending()));
    }

    public Answer findById(long id){
        return this.answerRepository.findById(id).get();
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
                        new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
        return verifiedAnswer;
    }

    // Answer 채택
    @Transactional
    public Answer acceptAnswer(long answerId) {
        Answer findAnswer = findVerifiedAnswer(answerId);

        // 채택한 answer status를 바꿈
        findAnswer.setAnswerStatus(Answer.AnswerStatus.ACCEPTED);

        // 바꾼 status로 저장
        return answerRepository.save(findAnswer);
    }
}
