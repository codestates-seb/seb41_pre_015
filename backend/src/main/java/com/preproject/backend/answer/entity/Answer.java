package com.preproject.backend.answer.entity;

import com.preproject.backend.audit.Auditable;
import com.preproject.backend.comment.entity.AnswerComment;
import com.preproject.backend.comment.entity.QuestionComment;
import com.preproject.backend.member.entity.Member;
import com.preproject.backend.question.entity.Question;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@NoArgsConstructor
@Getter
@Setter
@Entity
public class Answer extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 255, nullable = false)
    private String content;

    @Column(nullable = false)
    private int score;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private AnswerStatus answerStatus =  AnswerStatus.UNACCEPTED;


    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @OneToMany(mappedBy = "answer", cascade = CascadeType.REMOVE)
    private List<AnswerVote> answerVoteList = new ArrayList<>();

    // 답변 ~ 코멘트 (양방향)
    @OneToMany(mappedBy = "answer", cascade = CascadeType.REMOVE)
    private List<AnswerComment> answerComments = new ArrayList<>();

    public enum AnswerStatus {
        ACCEPTED("채택"),
        UNACCEPTED("채택되지 않음");
        @Getter
        private String status;

        AnswerStatus(String status) {
            this.status = status;
        }
    }
}
