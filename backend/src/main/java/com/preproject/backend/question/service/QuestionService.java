package com.preproject.backend.question.service;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.preproject.backend.question.entity.Question;
import com.preproject.backend.question.repository.QuestionRepository;

import lombok.extern.slf4j.Slf4j;

@Transactional
@Service
@Slf4j
public class QuestionService {
	//Repository DI
	public final QuestionRepository questionRepository;

	public QuestionService(QuestionRepository questionRepository) {
		this.questionRepository = questionRepository;
	}

	// *** 질문 등록 ***
	public Question createQuestion(Question question) {
		// + 유효한 멤버인지 검증(memberId)

		// 중복 질문, 내용 여부 검증할 것 없이 바로 저장
		Question savedQuestion = questionRepository.save(question);

		return savedQuestion;
	}

	// *** 질문 수정 ***
	public Question updateQuestion(Question question) {
		// 수정할 질문Id가 유효한 질문인지 검증
		Question findQuestion = findVerifiedQuestionByQuery(question.getId());

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
		return findVerifiedQuestionByQuery(id);
	}

	// *** 전체 질문 조회 (Paging) ***
	@Transactional(readOnly = true)
	public Page<Question> findQuestions(int page, int size) {
		return questionRepository.findAll(PageRequest.of(page, size,
			Sort.by("id").descending()));
	}

	// *** 질문 검색 기능 ***
/*	public List<Question> searchQuestion(String searchKeyword, Pageable pageable) {
		return questionRepository.findByTitleContaining(searchKeyword, pageable);
	}*/

	// *** 질문 필터 검색 (검색과 같은지?) ***
	public Question filterQuestion() {
		return null;
	}

	// *** 질문 추천 ***
	public Question upVote() {
		return null;
	}

	// *** 질문 비추천 ***
	public Question downVote() {
		return null;
	}

	// *** 특정 질문 북마크로 저장 ***
	public Question saveQuestion() {
		return null;
	}

	// *** 질문 채택 ***
	public Question selectQuestion() {
		// 유효한 질문인지 검증

		return null;
	}

	// *** 하나의 질문 삭제 ***
	public void deleteQuestion(Long id) {
		// 유효한 질문인지 검증
		Question findQuestion = findVerifiedQuestionByQuery(id);

		// 질문 삭제
		questionRepository.delete(findQuestion);
	}

	// *** 전체 질문 삭제 ***
	public void deleteQuestions(Question question) {
		questionRepository.deleteAll();
		log.info("모든 질문이 삭제 되었습니다.");
	}

	// *** 유효한 질문인지 검증 ***
	private Question findVerifiedQuestionByQuery(Long id) {
		Optional<Question> optionalQuestion = questionRepository.findById(id);
		Question findQuestion =
			optionalQuestion.orElseThrow(() -> new NoSuchElementException()); //exception code 줄 것

		return findQuestion;
	}
}