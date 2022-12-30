package com.preproject.backend.member.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.preproject.backend.member.entity.Member;

import com.preproject.backend.valid.NotSpace;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class MemberDto {

	@Getter
	@AllArgsConstructor
	public static class Post {

		@NotNull
		@Size(max = 12)
		@Pattern(regexp = "^[a-zA-Zㄱ-힣]+$",
				message = "최소 1자 이상이어야 하며, 특수문자 및 공백은 포함될 수 없습니다.")
		private String name;

		@Email
		@NotBlank
		private String email;


		@NotNull
		@Pattern(regexp ="^(?=.*\\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\\da-zA-Z~!@#$%^&*]+$",
		message = "영문자와 숫자로 구성되며 최소 하나 이상의 특수문자(~!@#$%^&*)가 포함되어야합니다. "+
				"공백은 포함될 수 없습니다")
		@Size(min = 8, max = 16,
		message = "최소 8자 이상, 최대 16자 이하여야 합니다.")
		private String password;
	}

	@Getter
	@AllArgsConstructor
	public static class Patch {
		@Setter
		private Long id;

		@Size(max = 12)
		@Pattern(regexp = "^[a-zA-Zㄱ-힣]+$",
				message = "최소 1자 이상이어야 하며, 특수문자 및 공백은 포함될 수 없습니다.")
		private String name;

		@Pattern(regexp ="^(?=.*\\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\\da-zA-Z~!@#$%^&*]+$",
				message = "영문자와 숫자로 구성되며 최소 하나 이상의 특수문자(~!@#$%^&*)가 포함되어야합니다. "+
						"공백은 포함될 수 없습니다")
		@Size(min = 8, max = 16,
				message = "최소 8자 이상, 최대 16자 이하여야 합니다.")
		private String password;

		@Size(max = 255)
		@NotSpace
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
		private List<String> roles;
	}
}
