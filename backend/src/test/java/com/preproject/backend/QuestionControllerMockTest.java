package com.preproject.backend;

import static org.mockito.BDDMockito.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.constraints.ConstraintDescriptions;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;


import com.google.gson.Gson;
import com.preproject.backend.answer.dto.AnswerDto;
import com.preproject.backend.config.SecurityConfiguration;
import com.preproject.backend.member.entity.Member;
import com.preproject.backend.question.controller.QuestionController;
import com.preproject.backend.question.dto.QuestionDto;
import com.preproject.backend.question.entity.Question;
import com.preproject.backend.question.mapper.QuestionMapper;
import com.preproject.backend.question.service.QuestionService;
import com.preproject.backend.question.service.QuestionVoteService;

@WebMvcTest(
controllers = QuestionController.class,
	excludeAutoConfiguration = SecurityAutoConfiguration.class, // 추가
	excludeFilters = {
		@ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfiguration.class)})
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
@AutoConfigureMockMvc
public class QuestionControllerMockTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private Gson gson;

	@MockBean
	private QuestionService questionService;

	@MockBean
	private QuestionMapper mapper;

	@MockBean
	private QuestionVoteService questionVoteService;

	// *** 질문 등록 Test ***
	@Test
	public void postQuestionTest() throws Exception{

		// given
		QuestionDto.Post post = new QuestionDto.Post(1L, "질문입니다", "내용입니다");
		String content = gson.toJson(post);

		QuestionDto.Response responseDto =
				new QuestionDto.Response(1L,
					1L,
					"질문입니다",
					"내용입니다",
					0,
					Question.QuestionStatus.UNRESOLVED,
					LocalDateTime.now(),
					LocalDateTime.now(),
					new ArrayList<>(),
					new ArrayList<>()
					);

		// willReturn() 이 null 이 아니어야 한다
		given(mapper.questionPostDtoToQuestion(Mockito.any(QuestionDto.Post.class))).willReturn(new Question());

		given(questionService.createQuestion(Mockito.any(Question.class))).willReturn(new Question());

		given(mapper.questionToQuestionResponseDto(Mockito.any(Question.class))).willReturn(responseDto);

		// when
		ResultActions actions =
			mockMvc.perform(
				post("/questions")
					.accept(MediaType.APPLICATION_JSON)
					.contentType(MediaType.APPLICATION_JSON)
					.content(content)
			);

		// then
		actions
			.andExpect(status().isCreated())
			.andExpect(jsonPath("$.memberId").value(post.getMemberId()))
			.andExpect(jsonPath("$.title").value(post.getTitle()))
			.andExpect(jsonPath("$.content").value(post.getContent()))
			.andDo(document("post-question",
				preprocessRequest(prettyPrint()),
				preprocessResponse(prettyPrint()),
				requestFields(
					List.of(
						fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("멤버 식별자"),
						fieldWithPath("title").type(JsonFieldType.STRING).description("제목"),
						fieldWithPath("content").type(JsonFieldType.STRING).description("내용")
					)
				),
				responseFields(
					List.of(
						fieldWithPath("id").type(JsonFieldType.NUMBER).description("질문 식별자"),
						fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("멤버 식별자"),
						fieldWithPath("title").type(JsonFieldType.STRING).description("제목"),
						fieldWithPath("content").type(JsonFieldType.STRING).description("내용"),
						fieldWithPath("score").type(JsonFieldType.NUMBER).description("추천수"),
						fieldWithPath("questionStatus").type(JsonFieldType.STRING).description("질문 상태: RESOLVED / UNRESOLVED"),
						fieldWithPath("createdAt").type(JsonFieldType.STRING).description("생성 날짜"),
						fieldWithPath("modifiedAt").type(JsonFieldType.STRING).description("수정 날짜"),
						fieldWithPath("answer").type(JsonFieldType.ARRAY).description("답변들"),
						fieldWithPath("questionComments").type(JsonFieldType.ARRAY).description("질문 댓글들")
					)
				)
			));
	}
//         --------------------------------------------------------------------------------------------------

	// *** 질문 수정 Test ***
	@Test
	void patchQuestionTest() throws Exception{

		// given
		Long id = 1L;
		QuestionDto.Patch patch = new QuestionDto.Patch(id, "바꿀 질문", "바꿀 내용");
		String content = gson.toJson(patch);

		QuestionDto.Response responseDto =
			new QuestionDto.Response(1L,
				1L,
				"바꿀 질문",
				"바꿀 내용",
				0,
				Question.QuestionStatus.UNRESOLVED,
				LocalDateTime.now(),
				LocalDateTime.now(),
				new ArrayList<>(),
				new ArrayList<>()
			);

		given(mapper.questionPatchDtoToQuestion(Mockito.any(QuestionDto.Patch.class))).willReturn(new Question());

		given(questionService.updateQuestion(Mockito.any(Question.class))).willReturn(new Question());

		given(mapper.questionToQuestionResponseDto(Mockito.any(Question.class))).willReturn(responseDto);

		// when
		ResultActions actions =
			mockMvc.perform(
				patch("/questions/{id}" , id)
					.accept(MediaType.APPLICATION_JSON)
					.contentType(MediaType.APPLICATION_JSON)
					.content(content)
			);

		// then

		// 유효성 검증에 사용된 애너테이션에 대한 정보를 추가
		ConstraintDescriptions patchQuestionConstraints = new ConstraintDescriptions(QuestionDto.Patch.class);
		List<String> contentDescriptions = patchQuestionConstraints.descriptionsForProperty("content");

		actions
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.id").value(patch.getId()))
			.andExpect(jsonPath("$.title").value(patch.getTitle()))
			.andExpect(jsonPath("$.content").value(patch.getContent()))
			.andDo(document("patch-question",
				preprocessRequest(prettyPrint()),
				preprocessResponse(prettyPrint()),
				requestFields(
					List.of(
						fieldWithPath("id").type(JsonFieldType.NUMBER).description("질문 식별자"),
						fieldWithPath("title").type(JsonFieldType.STRING).description("변경할 질문 제목").optional(),
						fieldWithPath("content").type(JsonFieldType.STRING).description("변경할 질문 내용").optional()
					)
				),
				responseFields(
					List.of(
						fieldWithPath("id").type(JsonFieldType.NUMBER).description("질문 식별자"),
						fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("멤버 식별자"),
						fieldWithPath("title").type(JsonFieldType.STRING).description("제목"),
						fieldWithPath("content").type(JsonFieldType.STRING).description("내용"),
						fieldWithPath("score").type(JsonFieldType.NUMBER).description("추천수"),
						fieldWithPath("questionStatus").type(JsonFieldType.STRING).description("질문 상태: RESOLVED / UNRESOLVED"),
						fieldWithPath("createdAt").type(JsonFieldType.STRING).description("생성 날짜"),
						fieldWithPath("modifiedAt").type(JsonFieldType.STRING).description("수정 날짜"),
						fieldWithPath("answer").type(JsonFieldType.ARRAY).description("답변들"),
						fieldWithPath("questionComments").type(JsonFieldType.ARRAY).description("질문 댓글들")
					)
				)
			));
	}

	//      --------------------------------------------------------------------------------------------------

	// *** 질문 조회 Test ***
	@Test
	void getQuestionTest() throws Exception{
		// given
		QuestionDto.Response responseDto =
			new QuestionDto.Response(1L,
				1L,
				"제목",
				"내용",
				0,
				Question.QuestionStatus.UNRESOLVED,
				LocalDateTime.now(),
				LocalDateTime.now(),
				new ArrayList<>(),
				new ArrayList<>()
			);

		given(mapper.questionToQuestionResponseDto(Mockito.any(Question.class))).willReturn(responseDto);
		given(questionService.findQuestion(Mockito.anyLong())).willReturn(new Question());

		// when
		ResultActions actions =
			mockMvc.perform(
				RestDocumentationRequestBuilders.get("/questions/{id}", 1L)
					.accept(MediaType.APPLICATION_JSON)
					.contentType(MediaType.APPLICATION_JSON)
			);

		// then
		actions
			.andExpect(status().isOk())
			.andDo(document("get-question",
				preprocessRequest(prettyPrint()),
				preprocessResponse(prettyPrint()),
				pathParameters(
					parameterWithName("id").description("조회할 질문 식별자")
				),
				responseFields(
					List.of(
						fieldWithPath("id").type(JsonFieldType.NUMBER).description("질문 식별자"),
						fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("멤버 식별자"),
						fieldWithPath("title").type(JsonFieldType.STRING).description("제목"),
						fieldWithPath("content").type(JsonFieldType.STRING).description("내용"),
						fieldWithPath("score").type(JsonFieldType.NUMBER).description("추천수"),
						fieldWithPath("questionStatus").type(JsonFieldType.STRING).description("질문 상태: RESOLVED / UNRESOLVED"),
						fieldWithPath("createdAt").type(JsonFieldType.STRING).description("생성 날짜"),
						fieldWithPath("modifiedAt").type(JsonFieldType.STRING).description("수정 날짜"),
						fieldWithPath("answer").type(JsonFieldType.ARRAY).description("답변들"),
						fieldWithPath("questionComments").type(JsonFieldType.ARRAY).description("질문 댓글들")
					)
				)
			));
	}

	//      --------------------------------------------------------------------------------------------------

	// *** 질문 전체 조회 Test
	@Test
	void getQuestionsTest() throws Exception{
		// given
		Question question = new Question(
			1L,
			"제목1",
			"내용1",
			0,
			Question.QuestionStatus.UNRESOLVED,
			new Member(),
			new ArrayList<>(),
			new ArrayList<>(),
			new ArrayList<>()
		);

		Question question2 = new Question(
			2L,
			"제목2",
			"내용2",
			0,
			Question.QuestionStatus.UNRESOLVED,
			new Member(),
			new ArrayList<>(),
			new ArrayList<>(),
			new ArrayList<>()
		);

		Question question3 = new Question(
			3L,
			"제목3",
			"내용3",
			0,
			Question.QuestionStatus.UNRESOLVED,
			new Member(),
			new ArrayList<>(),
			new ArrayList<>(),
			new ArrayList<>()
		);

		List<Question> questionList = List.of(question, question2, question3);

		int size = questionList.size();
		int page = 1;

		given(questionService.findLQuestions(Mockito.anyInt(), Mockito.anyInt()))
			.willReturn(new PageImpl<>(
				questionList,
				PageRequest.of(page , size, Sort.by("id").descending()), size));

		given(mapper.questionToQuestionResponseDtos(Mockito.anyList()))
			.willReturn(
			List.of(
				new QuestionDto.Response(
					questionList.get(0).getId(),
					questionList.get(0).getMember().getId(),
					questionList.get(0).getTitle(),
					questionList.get(0).getContent(),
					questionList.get(0).getScore(),
					questionList.get(0).getQuestionStatus(),
					questionList.get(0).getCreatedAt(),
					questionList.get(0).getModifiedAt(),
					new ArrayList<>(),
					new ArrayList<>()
				),
				new QuestionDto.Response(
					questionList.get(1).getId(),
					questionList.get(1).getMember().getId(),
					questionList.get(1).getTitle(),
					questionList.get(1).getContent(),
					questionList.get(1).getScore(),
					questionList.get(1).getQuestionStatus(),
					questionList.get(1).getCreatedAt(),
					questionList.get(1).getModifiedAt(),
					new ArrayList<>(),
					new ArrayList<>()
				),
				new QuestionDto.Response(
					questionList.get(2).getId(),
					questionList.get(2).getMember().getId(),
					questionList.get(2).getTitle(),
					questionList.get(2).getContent(),
					questionList.get(2).getScore(),
					questionList.get(2).getQuestionStatus(),
					questionList.get(2).getCreatedAt(),
					questionList.get(2).getModifiedAt(),
					new ArrayList<>(),
					new ArrayList<>()
				)
			));

		// when
		ResultActions actions =
			mockMvc.perform(
				get("/questions/latest/")
					.param("page", String.valueOf(page))
					.param("size", String.valueOf(size))
					.accept(MediaType.APPLICATION_JSON)
					.contentType(MediaType.APPLICATION_JSON)
			);

		// then
		actions
			.andExpect(status().isOk())
			.andDo(document("get-latest-questions",
				preprocessRequest(prettyPrint()),
				preprocessResponse(prettyPrint()),
				requestParameters(List.of(
					parameterWithName("page").description("페이지 번호"),
					parameterWithName("size").description("페이지 내 개수")
				)),
				responseFields(
					List.of(
						fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터"),
						fieldWithPath("data[0].id").type(JsonFieldType.NUMBER).description("질문 식별자"),
						fieldWithPath("data[1].memberId").type(JsonFieldType.NUMBER).description("멤버 식별자").optional(),
						fieldWithPath("data[2].title").type(JsonFieldType.STRING).description("제목"),
						fieldWithPath("data[3].content").type(JsonFieldType.STRING).description("내용"),
						fieldWithPath("data[4].score").type(JsonFieldType.NUMBER).description("추천수"),
						fieldWithPath("data[5].questionStatus").type(JsonFieldType.STRING).description("질문 상태: RESOLVED / UNRESOLVED"),
						fieldWithPath("data[6].createdAt").type(JsonFieldType.STRING).description("생성 날짜").optional(),
						fieldWithPath("data[7].modifiedAt").type(JsonFieldType.STRING).description("수정 날짜").optional(),
						fieldWithPath("data[8].answer").type(JsonFieldType.ARRAY).description("답변들"),
						fieldWithPath("data[9].questionComments").type(JsonFieldType.ARRAY).description("질문 댓글들"),
						fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
						fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("페이지 번호"),
						fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지 내 개수"),
						fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("총 게시물 수"),
						fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("총 페이지 수")
						)
				)
			));
	}

	//      --------------------------------------------------------------------------------------------------

	// *** 질문 삭제 Test ***
	@Test
	void deleteQuestionTest() throws Exception{
		// given
		Question question = new Question(
			1L,
			"제목1",
			"내용1",
			0,
			Question.QuestionStatus.UNRESOLVED,
			new Member(),
			new ArrayList<>(),
			new ArrayList<>(),
			new ArrayList<>()
		);

		doNothing().when(questionService).deleteQuestion(Mockito.anyLong());

		// when
		ResultActions actions =
			mockMvc.perform(
				RestDocumentationRequestBuilders.delete("/questions/{id}", 1L));

		// then
		actions.andExpect(status().isNoContent())
			.andDo(document(
				"delete-question",
				preprocessRequest(prettyPrint()),
				preprocessResponse(prettyPrint()),
				pathParameters(
					parameterWithName("id").description("질문 식별자")
				)
			));
	}
}
