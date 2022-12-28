package com.preproject.backend.question.service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.preproject.backend.answer.entity.Answer;
import com.preproject.backend.answer.service.AnswerService;
import com.preproject.backend.exception.BusinessLogicException;
import com.preproject.backend.exception.ExceptionCode;
import com.preproject.backend.member.service.MemberService;
import com.preproject.backend.question.entity.Question;
import com.preproject.backend.question.repository.QuestionRepository;

import lombok.extern.slf4j.Slf4j;

@Transactional
@Service
@Slf4j
public class QuestionService {
	//Repository DI
	private final QuestionRepository questionRepository;
	private final MemberService memberService;
	private final AnswerService answerService;

	public QuestionService(QuestionRepository questionRepository, MemberService memberService,
		AnswerService answerService) {
		this.questionRepository = questionRepository;
		this.memberService = memberService;
		this.answerService = answerService;
	}

	// *** 질문 등록 ***
	public Question createQuestion(Question question) {

		// + 유효한 멤버인지 검증(memberId)
		memberService.checkVerifiedMember(question.getMember().getId());

		// 질문 저장
		return questionRepository.save(question);
	}

	// *** 질문 수정 ***
	public Question updateQuestion(Question question) {
		// 수정할 질문Id가 유효한 질문인지 검증
		Question findQuestion = findVerifiedQuestion(question.getId());

		// 제목, 내용, (+ 태그) 수정
		Optional.ofNullable(question.getTitle())
			.ifPresent(title -> findQuestion.setTitle(title));
		Optional.ofNullable(question.getContent())
			.ifPresent(content -> findQuestion.setContent(content));

		// 수정한 뒤 저장
		return questionRepository.save(findQuestion);
	}

	// *** 하나의 질문 조회 ***
	@Transactional(readOnly = true)
	public Question findQuestion(Long id) {
		return findVerifiedQuestion(id);
	}

	// *** 전체 질문 조회 (Paging, 최신순) ***
	@Transactional(readOnly = true)
	public Page<Question> findLQuestions(int page, int size) {
		return questionRepository.findAll(PageRequest.of(page, size,
			Sort.by("id").descending()));
	}

	// *** 전체 질문 조회 (Paging, 추천순) ***
	@Transactional(readOnly = true)
	public Page<Question> findHQuestions(int page, int size) {
		return questionRepository.findAll(PageRequest.of(page, size,
			Sort.by("score").descending()));
	}

	// *** 질문 검색 기능 ***
	public Page<Question> searchQuestion(String keyword, int page, int size) {

		Pageable pageable = PageRequest.of(page, size);
		Page<Question> searchedQuestion = questionRepository.findByKeyword(keyword, pageable);

		return searchedQuestion;
	}

	// *** 질문 필터 검색 (검색과 같은지?) ***
	public Question filterQuestion() {
		return null;
	}

/*	// *** 특정 질문 북마크로 저장 ***
	public Question saveQuestion() {
		return null;
	}*/


	// *** 질문 채택 ***
	public Question resolveQuestion(Long questionId, Long answerId) {

		Answer answer = answerService.findById(answerId); // answer 찾아서
		answerService.acceptAnswer(answer.getId()); //채택 처리
		//Answer acceptAnswer = answerService.acceptAnswer(answerId); // 채택 처리

		Question findQuestion = findVerifiedQuestion(questionId); // question 검증

		// 채택한 답변이 존재하면 질문도 채택 상태로 만듬
		for(Answer a : getEveryAnswers(questionId)){
			if(a.getAnswerStatus().equals(Answer.AnswerStatus.ACCEPTED))
				findQuestion.setQuestionStatus(Question.QuestionStatus.RESOLVED);
		}

		// 2개의 답변 채택 불가능하도록
		List<Answer> totalAnswers = getEveryAnswers(questionId);
		List<Enum> statusList = totalAnswers.stream().map(Answer::getAnswerStatus).collect(Collectors.toList());

		if(Collections.frequency(statusList, Answer.AnswerStatus.ACCEPTED) >= 2){
			throw new BusinessLogicException(ExceptionCode.QUESTION_ALREADY_RESOLVED);
		}

		return questionRepository.save(findQuestion);
	}

	// ** 질문 Id로 해당 답변 list 가져옴
	public List<Answer> getEveryAnswers(Long questionId){
		Question findQuestion = findVerifiedQuestion(questionId);

		return findQuestion.getQuestionAnswers();
	}


	// *** 하나의 질문 삭제 ***
	public void deleteQuestion(Long id) {
		// 유효한 질문인지 검증
		Question findQuestion = findVerifiedQuestion(id);

		//TODO : 현재 로그인한 아이디 = 작성자 아이디 일치할 시 질문 삭제

		// 질문 삭제
		questionRepository.delete(findQuestion);
	}

	// *** 전체 질문 삭제 ***
	public void deleteQuestions(Question question) {
		questionRepository.deleteAll();
		log.info("모든 질문이 삭제 되었습니다.");
	}

	// *** 유효한 질문인지 검증 ***
	private Question findVerifiedQuestion(Long id) {
		Optional<Question> optionalQuestion = questionRepository.findById(id);
		Question findQuestion =
			optionalQuestion.orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
		return findQuestion;
	}
}