package com.preproject.backend.member.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.preproject.backend.member.entity.Member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class MemberDto {

	@Getter
	@AllArgsConstructor
	public static class Post {
		//TODO 이름 검증 정규식
		@NotBlank
		private String name;

		@Email
		@NotBlank
		private String email;

		//TODO 비밀번호 정규식
		@NotBlank
		@Size(max = 16)
		private String password;
	}

	@Getter
	@AllArgsConstructor
	public static class Patch {
		@Setter
		private Long id;

		//TODO 이름 검증 정규식
		private String name;

		//TODO 비밀번호 정규식
		@Size(max = 16)
		private String password;

		@Size(max = 255)
		private String aboutMe;

		private Member.MemberStatus status;
	}

	@Getter
	@AllArgsConstructor
	public static class Response {
		private Long id;
		private String name;
		private String email;
		private String aboutMe;
		private Member.MemberStatus status;
	}
}
