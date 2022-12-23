package com.preproject.backend.tag.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.preproject.backend.tag.entity.Tag;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
}
