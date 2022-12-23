package com.preproject.backend.tag.service;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.preproject.backend.tag.entity.Tag;
import com.preproject.backend.tag.repository.TagRepository;

@Service
public class TagService {
	private final TagRepository tagRepository;

	public TagService(TagRepository tagRepository) {
		this.tagRepository = tagRepository;
	}

	// ** 태그 저장 **
	public Tag createTag(Tag tag) {
		Tag savedTag = tagRepository.save(tag);

		return savedTag;
	}

	// ** 태그 삭제 **
	public void deleteTag(Long id) {
		// 유효한 태그인지 검증
		Tag findTag = findVerifiedTag(id);

		// 태그 삭제
		tagRepository.delete(findTag);
	}

	// ** 유효한 태그인지 검증 **
	private Tag findVerifiedTag(Long id) {
		Optional<Tag> optionalTag = tagRepository.findById(id);
		Tag findTag =
			optionalTag.orElseThrow(() -> new NoSuchElementException());

		return findTag;
	}
}
