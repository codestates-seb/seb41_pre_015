package com.preproject.backend.answer.controller;

import com.google.gson.Gson;
import com.jayway.jsonpath.JsonPath;
import com.preproject.backend.answer.dto.AnswerDto;
import com.preproject.backend.answer.entity.Answer;
import com.preproject.backend.answer.mapper.AnswerMapper;
import com.preproject.backend.answer.service.AnswerService;
import com.preproject.backend.answer.service.AnswerVoteService;
import com.preproject.backend.member.entity.Member;
import com.preproject.backend.question.entity.Question;
import com.preproject.backend.question.mapper.QuestionMapper;
import com.preproject.backend.question.service.QuestionService;
import org.apache.catalina.security.SecurityConfig;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;

import org.springframework.restdocs.constraints.ConstraintDescriptions;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;

@WebMvcTest(
        controllers = AnswerController.class,
        excludeAutoConfiguration = SecurityAutoConfiguration.class, // 추가
        excludeFilters = {
                @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class)}
)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureMockMvc
@AutoConfigureRestDocs
class AnswerControllerRestDocsTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private AnswerService answerService;

    @MockBean
    private AnswerMapper mapper;

    @MockBean
    private QuestionMapper questionMapper;

    @MockBean
    private AnswerVoteService answerVoteService;

    @MockBean
    private QuestionService questionService;

    @Test
    void postAnswer() throws Exception {
        //given
        AnswerDto.Post post = new AnswerDto.Post("This is Answer Test.", 1L, 1L);
        String content = gson.toJson(post);

        AnswerDto.Response responseDto =
                new AnswerDto.Response(1L, 1L, "홍길동",1L,
                        "This is Answer Test.", 0, Answer.AnswerStatus.UNACCEPTED,
                        LocalDateTime.now(), LocalDateTime.now(), new ArrayList<>());

        given(mapper.answerPostDtoToAnswer(Mockito.any(AnswerDto.Post.class))).willReturn(new Answer());
        given(answerService.createAnswer(Mockito.any(Answer.class))).willReturn(new Answer());
        given(mapper.answerToAnswerResponseDto(Mockito.any(Answer.class))).willReturn(responseDto);

        //when
        ResultActions actions =
                mockMvc.perform(
                        post("/answers")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        //then
        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.content").value(post.getContent()))
                .andDo(document("post-answer",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                List.of(
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("답변 내용"),
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("questionId").type(JsonFieldType.NUMBER).description("질문 식별자")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("답변 식별자"),
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("memberName").type(JsonFieldType.STRING).description("답변 작성자"),
                                        fieldWithPath("questionId").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("답변 내용"),
                                        fieldWithPath("score").type(JsonFieldType.NUMBER).description("답변 투표수"),
                                        fieldWithPath("answerStatus").type(JsonFieldType.STRING)
                                                .description("답변 채택 상태 : 채택 / 채택안됨"),
                                        fieldWithPath("createdAt").type(JsonFieldType.STRING).description("생성 시간"),
                                        fieldWithPath("modifiedAt").type(JsonFieldType.STRING).description("수정 시간"),
                                        fieldWithPath("answerComments").type(JsonFieldType.ARRAY).description("답변 코멘트")
                                )
                        )
                ));
    }

    @Test
    void patchAnswer() throws Exception {
        //given
        long answerId = 1L;
        AnswerDto.Patch patch = new AnswerDto.Patch(answerId, "This is Answer Test.");
        String content = gson.toJson(patch);

        AnswerDto.Response responseDto =
                new AnswerDto.Response(1L, 1L, "홍길동", 1L,
                        "This is Answer Test.", 0, Answer.AnswerStatus.UNACCEPTED,
                        LocalDateTime.now(), LocalDateTime.now(), new ArrayList<>());

        given(mapper.answerPatchDtoToAnswer(Mockito.any(AnswerDto.Patch.class))).willReturn(new Answer());
        given(answerService.updateAnswer(Mockito.any(Answer.class))).willReturn(new Answer());
        given(mapper.answerToAnswerResponseDto(Mockito.any(Answer.class))).willReturn(responseDto);

        //when
        ResultActions actions =
                mockMvc.perform(
                        patch("/answers/{answer-id}", answerId)
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        //then
        // 유효성 검증에 사용된 애너테이션에 대한 정보를 추가
        ConstraintDescriptions patchAnswerConstraints = new ConstraintDescriptions(AnswerDto.Patch.class);
        List<String> contentDescriptions = patchAnswerConstraints.descriptionsForProperty("content");

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").value(patch.getContent()))
                .andDo(document("patch-answer",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("answer-id").description("답변 식별자")
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("답변 식별자").ignored(),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("답변 내용")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("id").type(JsonFieldType.NUMBER).description("답변 식별자"),
                                        fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("memberName").type(JsonFieldType.STRING).description("답변 작성자"),
                                        fieldWithPath("questionId").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("답변 내용"),
                                        fieldWithPath("score").type(JsonFieldType.NUMBER).description("답변 투표수"),
                                        fieldWithPath("answerStatus").type(JsonFieldType.STRING)
                                                .description("답변 채택 상태 : 채택 / 채택안됨"),
                                        fieldWithPath("createdAt").type(JsonFieldType.STRING).description("생성 시간"),
                                        fieldWithPath("modifiedAt").type(JsonFieldType.STRING).description("수정 시간"),
                                        fieldWithPath("answerComments").type(JsonFieldType.ARRAY).description("답변 코멘트")
                                )
                        )
                ));
    }

    @Test
    void getAnswers() throws Exception{
        //given
        String page = "1";
        String size = "3";

        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("page", page);
        queryParams.add("size", size);

        Answer answer1 = new Answer();
        answer1.setId(1L);
        answer1.setContent("this is stub1");
        answer1.setScore(0);
        answer1.setAnswerStatus(Answer.AnswerStatus.ACCEPTED);
        answer1.setMember(new Member());
        answer1.setQuestion(new Question());
        answer1.setAnswerComments(new ArrayList<>());
        answer1.setAnswerVoteList(new ArrayList<>());

        Answer answer2 = new Answer();
        answer2.setId(2L);
        answer2.setContent("this is stub2");
        answer2.setScore(0);
        answer2.setAnswerStatus(Answer.AnswerStatus.UNACCEPTED);
        answer2.setMember(new Member());
        answer2.setQuestion(new Question());
        answer2.setAnswerComments(new ArrayList<>());
        answer2.setAnswerVoteList(new ArrayList<>());

        AnswerDto.Response responseDto1 =
                new AnswerDto.Response(1L, 1L, "홍길동1", 1L,
                        "This is stub1.", 0, Answer.AnswerStatus.ACCEPTED,
                        LocalDateTime.now(), LocalDateTime.now(), new ArrayList<>());

        AnswerDto.Response responseDto2 =
                new AnswerDto.Response(2L, 1L, "홍길동2", 1L,
                        "This is stub2.", 0, Answer.AnswerStatus.UNACCEPTED,
                        LocalDateTime.now(), LocalDateTime.now(), new ArrayList<>());

        Page<Answer> answers = new PageImpl<>(List.of(answer1, answer2),
                PageRequest.of(0, 3, Sort.by("answerId").descending()), 2);
        List<AnswerDto.Response> responses = new ArrayList<>();
        responses.add(responseDto1);
        responses.add(responseDto2);

        //Stubbing
        given(answerService.findLAnswers(Mockito.anyInt(), Mockito.anyInt())).willReturn(answers);
        given(mapper.answerToAnswerResponseDtos(Mockito.anyList())).willReturn(responses);

        //when
        ResultActions actions =
                mockMvc.perform(
                        RestDocumentationRequestBuilders.get("/answers/latest")
                                .params(queryParams)
                                .accept(MediaType.APPLICATION_JSON));

        //then
        MvcResult result =
                actions
                        .andExpect(status().isOk())
                        .andDo(
                                document(
                                        "get-answers",

                                        preprocessRequest(prettyPrint()),
                                        preprocessResponse(prettyPrint()),
                                        requestParameters(
                                                List.of(
                                                        parameterWithName("page").description("Page 번호"),
                                                        parameterWithName("size").description("Page Size")
                                                )
                                        ),
                                        responseFields(
                                                Arrays.asList(
                                                        fieldWithPath("data").type(JsonFieldType.ARRAY).description("결과 데이터").optional(),
                                                        fieldWithPath("data[].id").type(JsonFieldType.NUMBER).description("답변 식별자"),
                                                        fieldWithPath("data[].memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                                        fieldWithPath("data[].memberName").type(JsonFieldType.STRING).description("답변 작성자"),
                                                        fieldWithPath("data[].questionId").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                                        fieldWithPath("data[].content").type(JsonFieldType.STRING).description("답변 내용"),
                                                        fieldWithPath("data[].score").type(JsonFieldType.NUMBER).description("답변 투표수"),
                                                        fieldWithPath("data[].answerStatus").type(JsonFieldType.STRING)
                                                                .description("답변 채택 상태 : 채택 / 채택안됨"),
                                                        fieldWithPath("data[].createdAt").type(JsonFieldType.STRING).description("생성 시간"),
                                                        fieldWithPath("data[].modifiedAt").type(JsonFieldType.STRING).description("수정 시간"),
                                                        fieldWithPath("data[].answerComments").type(JsonFieldType.ARRAY).description("답변 코멘트"),
                                                        fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
                                                        fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("페이지 번호"),
                                                        fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지 사이즈"),
                                                        fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("전체 건 수"),
                                                        fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("전체 페이지 수")
                                                )
                                        )
                                )
                        )
                        .andReturn();

        List list = JsonPath.parse(result.getResponse().getContentAsString()).read("$.data");
        assertThat(list.size(), is(2));
    }

    @Test
    void deleteAnswer() throws Exception {
        //given
        long answerId = 1L;
        doNothing().when(answerService).deleteAnswer(Mockito.anyLong());

        //when
        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders
                        .delete("/answers/{answer-id}", answerId));

        //then
        actions.andExpect(status().isNoContent())
                .andDo(
                        document(
                                "delete-answer",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                pathParameters(
                                        parameterWithName("answer-id").description("답변 식별자")
                                )
                        )
                );
    }


    void upVoteAnswer() {
    }


    void downVoteAnswer() {
    }


    void acceptAnswer() {
    }
}