package com.preproject.backend.comment.service;

import com.preproject.backend.comment.entity.QuestionComment;
import com.preproject.backend.comment.repository.QuestionCommentRepository;
import com.preproject.backend.exception.BusinessLogicException;
import com.preproject.backend.exception.ExceptionCode;
import com.preproject.backend.member.entity.Member;
import com.preproject.backend.member.service.MemberService;
import com.preproject.backend.utils.CustomBeanUtils;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class QuestionCommentService {
    private final CustomBeanUtils beanUtils;
    private final QuestionCommentRepository questionCommentRepository;
    private final MemberService memberService;

    public QuestionCommentService(CustomBeanUtils beanUtils, QuestionCommentRepository questionCommentRepository,
        MemberService memberService) {
        this.beanUtils = beanUtils;
        this.questionCommentRepository = questionCommentRepository;
        this.memberService = memberService;
    }

    public QuestionComment createComment(QuestionComment questioncomment){
        Member verifiedMember = memberService.checkVerifiedMember(questioncomment.getMember().getId());
        questioncomment.setMember(verifiedMember);

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
                        new BusinessLogicException(ExceptionCode.QUESTION_COMMENT_NOT_FOUND));
        return verifiedQuestionComment;
    }
}
