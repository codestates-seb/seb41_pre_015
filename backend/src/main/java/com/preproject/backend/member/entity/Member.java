package com.preproject.backend.member.entity;

import com.preproject.backend.answer.entity.Answer;
import com.preproject.backend.audit.Auditable;
import com.preproject.backend.question.entity.Question;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Member extends Auditable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, unique = true, updatable = false)
	private String email;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String password;

	private String aboutMe = "";

	@Enumerated(EnumType.STRING)
	private Member.MemberStatus status = MemberStatus.ACTIVE;

	@OneToMany(mappedBy = "member")
	private List<Question> questions = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	private List<Answer> answers = new ArrayList<>();

	public Member(String name, String email, String password) {
		this.name = name;
		this.email = email;
		this.password = password;
	}

	public void addQuestion(Question question) {
		this.questions.add(question);
		if (question.getMember() != this) {
			question.setMember(this);
		}
	}

	public void addAnswer(Answer answer) {
		this.answers.add(answer);
		if (answer.getMember() != this) {
			answer.setMember(this);
		}
	}

	public enum MemberStatus {
		ACTIVE("활동중"),
		SLEEP("휴면 상태"),
		QUIT("탈퇴 상태");

		@Getter
		private String status;

		MemberStatus(String status) {
			this.status = status;
		}
	}
}
