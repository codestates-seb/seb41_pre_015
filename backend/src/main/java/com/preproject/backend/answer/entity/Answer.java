package com.preproject.backend.answer.entity;

import com.preproject.backend.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import javax.persistence.*;


@NoArgsConstructor
@Getter
@Setter
@Entity
public class Answer extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private int score;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private AnswerStatus answerStatus =  AnswerStatus.UNACCEPTED;

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
