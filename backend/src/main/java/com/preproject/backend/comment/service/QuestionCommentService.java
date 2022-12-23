package com.preproject.backend.comment.service;

import com.preproject.backend.comment.entity.QuestionComment;
import com.preproject.backend.comment.repository.QuestionCommentRepository;
import com.preproject.backend.utils.CustomBeanUtils;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class QuestionCommentService {
    private final CustomBeanUtils beanUtils;
    private final QuestionCommentRepository questionCommentRepository;

    public QuestionCommentService(CustomBeanUtils beanUtils, QuestionCommentRepository questionCommentRepository) {
        this.beanUtils = beanUtils;
        this.questionCommentRepository = questionCommentRepository;
    }

    public QuestionComment createComment(QuestionComment questioncomment){
        return questionCommentRepository.save(questioncomment);
    }

    public QuestionComment updateComment(QuestionComment questioncomment){
        QuestionComment verifiedQuestionComment = findVerifiedQuestionComment(questioncomment.getId());

        beanUtils.copyNonNullProperties(questioncomment, verifiedQuestionComment);

        return questionCommentRepository.save(verifiedQuestionComment);
    }

    public void deleteComment(long id) {
        QuestionComment verifiedQuestionComment = findVerifiedQuestionComment(id);

        questionCommentRepository.delete(verifiedQuestionComment);
    }

    public QuestionComment findVerifiedQuestionComment(long id) {
        Optional<QuestionComment> optionalQuestionComment =
                questionCommentRepository.findById(id);
        QuestionComment verifiedQuestionComment =
                optionalQuestionComment.orElseThrow(() ->
                        new RuntimeException("QuestionComment Not Found")); //리펙토링 필요
        return verifiedQuestionComment;
    }
}
