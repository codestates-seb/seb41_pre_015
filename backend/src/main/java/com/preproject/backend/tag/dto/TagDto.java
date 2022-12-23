package com.preproject.backend.tag.dto;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TagDto {
	public static class Post {
		@NotBlank(message = "name은 공백이 아니어야 합니다.")
		private String name;
	}
}
