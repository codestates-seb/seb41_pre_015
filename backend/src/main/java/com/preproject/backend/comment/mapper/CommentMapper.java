package com.preproject.backend.comment.mapper;

import com.preproject.backend.comment.dto.CommentDto;
import com.preproject.backend.comment.entity.Comment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    Comment CommentPostDtoToComment(CommentDto.Post requestBody);
    Comment CommentPatchDtoToComment(CommentDto.Patch requestBody);
    CommentDto.Response CommentToCommentResponseDto(Comment comment);
}
