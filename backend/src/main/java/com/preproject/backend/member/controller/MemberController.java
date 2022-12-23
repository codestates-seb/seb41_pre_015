package com.preproject.backend.member.controller;

import com.preproject.backend.member.dto.MemberDto;
import com.preproject.backend.member.entity.Member;
import com.preproject.backend.member.mapper.MemberMapper;
import com.preproject.backend.member.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/members")
@Validated
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;

    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post memberPost) {

        Member member = memberService.createMember(mapper.memberPostToMember(memberPost));
        MemberDto.Response response = mapper.memberToMemberResponse(member);

        return new ResponseEntity(response, HttpStatus.CREATED);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@Valid @RequestBody MemberDto.Patch memberPatch,
                                      @Positive @PathVariable("member-id") Long id) {

        memberPatch.setId(id);
        Member member = memberService.updateMember(mapper.memberPatchToMember(memberPatch));
        MemberDto.Response response = mapper.memberToMemberResponse(member);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@Positive @PathVariable("memberId") Long id) {

        Member member = memberService.findMember(id);
        MemberDto.Response response = mapper.memberToMemberResponse(member);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getMembers(@RequestParam("page") int page,
                                     @RequestParam("size") int size) {

        return new ResponseEntity(HttpStatus.OK);
    }
    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@Positive @PathVariable("member-id") Long id) {

        memberService.deleteMember(id);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
