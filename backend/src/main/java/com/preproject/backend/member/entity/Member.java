package com.preproject.backend.member.entity;

import com.preproject.backend.audit.Auditable;
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

	public Member(String name, String email, String password) {
		this.name = name;
		this.email = email;
		this.password = password;
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
