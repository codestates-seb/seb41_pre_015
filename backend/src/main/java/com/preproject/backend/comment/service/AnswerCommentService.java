package com.preproject.backend.comment.service;

import com.preproject.backend.comment.entity.AnswerComment;
import com.preproject.backend.comment.repository.AnswerCommentRepository;
import com.preproject.backend.exception.BusinessLogicException;
import com.preproject.backend.exception.ExceptionCode;
import com.preproject.backend.member.entity.Member;
import com.preproject.backend.member.service.MemberService;
import com.preproject.backend.utils.CustomBeanUtils;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AnswerCommentService {
    private final CustomBeanUtils beanUtils;
    private final AnswerCommentRepository answerCommentRepository;
    private final MemberService memberService;

    public AnswerCommentService(CustomBeanUtils beanUtils, AnswerCommentRepository answerCommentRepository,
        MemberService memberService) {
        this.beanUtils = beanUtils;
        this.answerCommentRepository = answerCommentRepository;
        this.memberService = memberService;
    }

    public AnswerComment createComment(AnswerComment answercomment){

        Member verifiedMember = memberService.checkVerifiedMember(answercomment.getMember().getId());
        answercomment.setMember(verifiedMember);

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
                        new BusinessLogicException(ExceptionCode.ANSWER_COMMENT_NOT_FOUND));
        return verifiedAnswerComment;
    }
}
