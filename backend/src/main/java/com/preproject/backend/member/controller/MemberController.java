package com.preproject.backend.member.controller;

import com.preproject.backend.answer.dto.AnswerDto;
import com.preproject.backend.answer.entity.Answer;
import com.preproject.backend.answer.mapper.AnswerMapper;
import com.preproject.backend.dto.MultiResponseDto;
import com.preproject.backend.member.dto.MemberDto;
import com.preproject.backend.member.entity.Member;
import com.preproject.backend.member.mapper.MemberMapper;
import com.preproject.backend.member.service.MemberService;
import com.preproject.backend.question.dto.QuestionDto;
import com.preproject.backend.question.entity.Question;
import com.preproject.backend.question.mapper.QuestionMapper;
import org.springframework.data.domain.Page;
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
import java.util.List;

@RestController
@RequestMapping("/members")
@Validated
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper memberMapper;
    private final QuestionMapper questionMapper;
    private final AnswerMapper answerMapper;

    public MemberController(MemberService memberService, MemberMapper memberMapper, QuestionMapper questionMapper, AnswerMapper answerMapper) {
        this.memberService = memberService;
        this.memberMapper = memberMapper;
        this.questionMapper = questionMapper;
        this.answerMapper = answerMapper;
    }

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post memberPost) {

        Member member = memberService.createMember(memberMapper.memberPostToMember(memberPost));
        MemberDto.Response response = memberMapper.memberToMemberResponse(member);

        return new ResponseEntity(response, HttpStatus.CREATED);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@Valid @RequestBody MemberDto.Patch memberPatch,
                                      @Positive @PathVariable("member-id") Long id) {

        memberPatch.setId(id);
        Member member = memberService.updateMember(memberMapper.memberPatchToMember(memberPatch));
        MemberDto.Response response = memberMapper.memberToMemberResponse(member);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@Positive @PathVariable("member-id") Long id) {

        Member member = memberService.findMember(id);
        MemberDto.Response response = memberMapper.memberToMemberResponse(member);

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getMembers(@RequestParam("page") int page,
                                     @RequestParam("size") int size) {

        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/{member-id}/questions")
    public ResponseEntity getQuestionsOfMember(@Positive @RequestParam("page") int page,
                                               @Positive @RequestParam("size") int size,
                                               @Positive @PathVariable("member-id") long id) {

        Page<Question> questionPageOfMember = memberService.findQuestionsOfMember(id, page - 1, size);
        List<Question> content = questionPageOfMember.getContent();
        List<QuestionDto.Response> responses = questionMapper.questionToQuestionResponseDtos(content);

        return new ResponseEntity(new MultiResponseDto<>(responses, questionPageOfMember), HttpStatus.OK);
    }

    @GetMapping("/{member-id}/answers")
    public ResponseEntity getAnswersOfMember(@Positive @RequestParam("page") int page,
                                             @Positive @RequestParam("size") int size,
                                             @Positive @PathVariable("member-id") long id) {
        Page<Answer> answerPageOfMember = memberService.findAnswersOfMember(id, page - 1, size);
        List<Answer> content = answerPageOfMember.getContent();
        List<AnswerDto.Response> responses = answerMapper.answerToAnswerResponseDtos(content);

        return new ResponseEntity(new MultiResponseDto<>(responses, answerPageOfMember), HttpStatus.OK);
    }


    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@Positive @PathVariable("member-id") Long id) {

        memberService.deleteMember(id);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
