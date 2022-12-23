package com.preproject.backend.tag.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import com.preproject.backend.tag.dto.TagDto;
import com.preproject.backend.tag.entity.Tag;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TagMapper {
	Tag tagPostDtoToTag(TagDto.Post tagPostDto);

}
