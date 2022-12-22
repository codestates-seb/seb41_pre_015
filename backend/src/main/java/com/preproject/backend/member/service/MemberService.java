package com.preproject.backend.member.service;

import org.springframework.stereotype.Service;

import com.preproject.backend.member.dto.MemberDto;
import com.preproject.backend.member.entity.Member;

@Service
public class MemberService {
	public Member createMember(Member member) {
		//TODO
		// 비지니스 로직 작성
		// member 객체 DB에 저장 후 저장된 member 반환
		// 이미 저장된 member 확인 시 throw Exception
		return member;
	}

	public Member updateMember(Member member) {
		//TODO
		// 비지니스 로직 작성
		// id로 DB에서 member 조회 후 member 객체 수정, DB에 저장하고 저장된 member 반환
		// 조회 시 해당 member 없으면 throw Exception
		return member;
	}

	public Member findMember(long id) {
		//TODO
		// 비지니스 로직 작성
		// id로 DB에서 member 조회 후 조회된 member 반환
		// 조회 시 해당 member 없으면 throw Exception
		Member member =
				new Member("hgd@gmail.com", "홍길동", "010-1234-5678");
		member.setId(id);
		return member;
	}

	public void deleteMember(long id) {
		//TODO
		// 비지니스 로직 작성
		// id로 DB에서 member 조회 후 삭제
		// 조회 시 해당 member 없으면 throw Exception
	}
}
