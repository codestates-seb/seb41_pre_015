package com.preproject.backend.member.service;

import com.preproject.backend.exception.BusinessLogicException;
import com.preproject.backend.exception.ExceptionCode;
import com.preproject.backend.member.entity.Member;
import com.preproject.backend.member.repository.MemberRepository;
import com.preproject.backend.utils.CustomBeanUtils;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final CustomBeanUtils<Member> customBeanUtils;

    public MemberService(MemberRepository memberRepository, CustomBeanUtils customBeanUtils) {
        this.memberRepository = memberRepository;
        this.customBeanUtils = customBeanUtils;
    }

    public Member createMember(Member member) {

        checkDuplicatedMember(member);

        return memberRepository.save(member);

    }

    public Member updateMember(Member member) {

        Member findMember = checkVerifiedMember(member.getId());
        Member updatedMember = customBeanUtils.copyNonNullProperties(member, findMember);

        return memberRepository.save(updatedMember);
    }

    public Member findMember(long id) {
        Member findMember = checkVerifiedMember(id);

        return findMember;
    }

    public void deleteMember(long id) {
        Member findMember = checkVerifiedMember(id);
        memberRepository.delete(findMember);
    }

    private void checkDuplicatedMember(Member member) {
        Optional<Member> byEmail = memberRepository.findByEmail(member.getEmail());
        if (byEmail.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_ALREADY_EXISTS);
        }
    }

    private Member checkVerifiedMember(Long id) {
        Optional<Member> byId = memberRepository.findById(id);
        Member member = byId.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return member;
    }
}
