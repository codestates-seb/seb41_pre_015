package com.preproject.backend.member.mapper;

import org.mapstruct.Mapper;

import com.preproject.backend.member.dto.MemberDto;
import com.preproject.backend.member.entity.Member;

@Mapper(componentModel = "spring")
public interface MemberMapper {
	Member memberPostToMember(MemberDto.Post requestBody);

	Member memberPatchToMember(MemberDto.Patch requestBody);

	MemberDto.Response memberToMemberResponse(Member member);
}
