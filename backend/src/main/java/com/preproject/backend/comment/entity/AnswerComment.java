package com.preproject.backend.comment.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.preproject.backend.answer.entity.Answer;
import com.preproject.backend.audit.Auditable;
import com.preproject.backend.member.entity.Member;
import com.preproject.backend.question.entity.Question;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class AnswerComment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 255, nullable = false)
    private String content;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "answer_id")
    private Answer answer;
}
