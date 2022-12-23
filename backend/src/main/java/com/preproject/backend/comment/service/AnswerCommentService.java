package com.preproject.backend.comment.service;

import com.preproject.backend.comment.entity.AnswerComment;
import com.preproject.backend.comment.repository.AnswerCommentRepository;
import com.preproject.backend.utils.CustomBeanUtils;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AnswerCommentService {
    private final CustomBeanUtils beanUtils;
    private final AnswerCommentRepository answerCommentRepository;

    public AnswerCommentService(CustomBeanUtils beanUtils, AnswerCommentRepository answerCommentRepository) {
        this.beanUtils = beanUtils;
        this.answerCommentRepository = answerCommentRepository;
    }

    public AnswerComment createComment(AnswerComment answercomment){
        return answerCommentRepository.save(answercomment);
    }

    public AnswerComment updateComment(AnswerComment answercomment){
        AnswerComment verifiedAnswerComment = findVerifiedComment(answercomment.getId());

        beanUtils.copyNonNullProperties(answercomment, verifiedAnswerComment);

        return answerCommentRepository.save(verifiedAnswerComment);
    }

    public void deleteComment(long id) {
        AnswerComment verifiedAnswerComment = findVerifiedComment(id);

        answerCommentRepository.delete(verifiedAnswerComment);
    }

    public AnswerComment findVerifiedComment(long id) {
        Optional<AnswerComment> optionalAnswerComment =
                answerCommentRepository.findById(id);
        AnswerComment verifiedAnswerComment =
                optionalAnswerComment.orElseThrow(() ->
                        new RuntimeException("AnswerComment Not Found")); //리펙토링 필요
        return verifiedAnswerComment;
    }
}
