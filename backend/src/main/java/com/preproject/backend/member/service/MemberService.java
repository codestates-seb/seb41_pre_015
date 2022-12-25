package com.preproject.backend.member.service;

import com.preproject.backend.exception.BusinessLogicException;
import com.preproject.backend.exception.ExceptionCode;
import com.preproject.backend.member.entity.Member;
import com.preproject.backend.member.repository.MemberRepository;
import com.preproject.backend.question.entity.Question;
import com.preproject.backend.question.repository.QuestionRepository;
import com.preproject.backend.utils.CustomBeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class MemberService {
    private final MemberRepository memberRepository;

    private final QuestionRepository questionRepository;
    private final CustomBeanUtils<Member> customBeanUtils;

    public MemberService(MemberRepository memberRepository, QuestionRepository questionRepository, CustomBeanUtils<Member> customBeanUtils) {
        this.memberRepository = memberRepository;
        this.questionRepository = questionRepository;
        this.customBeanUtils = customBeanUtils;
    }
    /* 회원 신규 등록*/
    public Member createMember(Member member) {

        checkDuplicatedMember(member);

        return memberRepository.save(member);

    }

    /* 회원 정보 수정 */
    public Member updateMember(Member member) {

        Member findMember = checkVerifiedMember(member.getId());
        Member updatedMember = customBeanUtils.copyNonNullProperties(member, findMember);

        return memberRepository.save(updatedMember);
    }

    /* 회원 정보 조회 */
    public Member findMember(long id) {
        Member findMember = checkVerifiedMember(id);

        return findMember;
    }

    /* 회원이 등록한 질문을 역순으로 정렬 후 pagenation하여 반환*/
    public Page<Question> findQuestionsOfMember(long id,
                                                int page,
                                                int size) {
        Member findMember = checkVerifiedMember(id);
        List<Question> questions = findMember.getQuestions();
        Collections.sort(questions, (quest1, quest2) -> {
            return quest2.getId().compareTo(quest1.getId());
        });

        PageRequest pageRequest = PageRequest.of(page, size);
        int start = (int) pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), size);

        return new PageImpl<>(questions.subList(start, end), pageRequest, size);
    }

    /* 회원 정보 삭제*/
    public void deleteMember(long id) {
        Member findMember = checkVerifiedMember(id);
        memberRepository.delete(findMember);
    }

    public void checkDuplicatedMember(Member member) {
        Optional<Member> byEmail = memberRepository.findByEmail(member.getEmail());
        if (byEmail.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_ALREADY_EXISTS);
        }
    }

    public Member checkVerifiedMember(Long id) {
        Optional<Member> byId = memberRepository.findById(id);
        Member member = byId.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return member;
    }
}
