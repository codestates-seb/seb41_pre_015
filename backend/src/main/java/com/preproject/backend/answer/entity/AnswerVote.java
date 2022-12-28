package com.preproject.backend.answer.entity;

import com.preproject.backend.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class AnswerVote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long voteId;

    @Enumerated(EnumType.STRING)
    private AnswerVoteStatus answerVoteStatus;

    @Column(name = "member_id")
    private Long memberId;

    @ManyToOne
    @JoinColumn(name = "answer_id")
    private Answer answer;

    public enum AnswerVoteStatus {
        UP("추천"),
        DOWN("비추천");

        @Getter
        private String status;

        AnswerVoteStatus(String status) {
            this.status = status;
        }
    }
}
