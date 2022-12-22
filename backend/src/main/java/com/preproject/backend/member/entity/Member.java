package com.preproject.backend.member.entity;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Member {
	private Long id;
	private String name;
	private String email;

	private String password;
	private String aboutMe = "";
	private Member.MemberStatus status = MemberStatus.ACTIVE;
	private LocalDateTime createdAt = LocalDateTime.now();
	private LocalDateTime modifiedAt = LocalDateTime.now();

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
