package com.preproject.backend.comment.service;

import com.preproject.backend.answer.entity.Answer;
import com.preproject.backend.comment.entity.Comment;
import com.preproject.backend.comment.repository.CommentRepository;
import com.preproject.backend.utils.CustomBeanUtils;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CommentService {
    private final CustomBeanUtils beanUtils;
    private final CommentRepository commentRepository;

    public CommentService(CustomBeanUtils beanUtils, CommentRepository commentRepository) {
        this.beanUtils = beanUtils;
        this.commentRepository = commentRepository;
    }

    public Comment createComment(Comment comment){
        return commentRepository.save(comment);
    }

    public Comment updateComment(Comment comment){
        Comment verifiedComment = findVerifiedComment(comment.getId());

        beanUtils.copyNonNullProperties(comment, verifiedComment);

        return commentRepository.save(verifiedComment);
    }

    public void deleteComment(long id) {
        Comment verifiedComment = findVerifiedComment(id);

        commentRepository.delete(verifiedComment);
    }

    public Comment findVerifiedComment(long id) {
        Optional<Comment> optionalComment =
                commentRepository.findById(id);
        Comment verifiedComment =
                optionalComment.orElseThrow(() ->
                        new RuntimeException("Comment Not Found")); //리펙토링 필요
        return verifiedComment;
    }
}
