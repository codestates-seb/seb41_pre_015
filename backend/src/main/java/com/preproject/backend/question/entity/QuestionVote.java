package com.preproject.backend.question.entity;

import com.preproject.backend.answer.entity.Answer;
import com.preproject.backend.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
public class QuestionVote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long voteId;

    @Enumerated(EnumType.STRING)
    private QuestionVote questionVote;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne
    @JoinColumn(name = "question_id")
    private Question question;

    public enum QuestionVoteStatus {
        UP("추천"),
        DOWN("비추천");

        @Getter
        private String status;

        QuestionVoteStatus(String status) {
            this.status = status;
        }
    }
}