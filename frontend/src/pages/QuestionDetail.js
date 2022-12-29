/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import LoginHeader from '../component/login/LoginHeader';
import LeftSidebar from '../component/LeftSidebar';
import RightSidebar from '../component/RightSidebar';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
// import { ImCheckmark, ImCheckmark2 } from 'react-icons/bs';
import Footer from '../component/Footer';
import { useParams, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

//AskQuestion 버튼과 라우터 연결(질문작성페이지 이동)
const SLinkquestion = styled(Link)`
  width: 35%;
  height: 30px;
  background-color: #0a95ff;
  border-radius: 2px;
  border-color: #0078ff;
  margin: 10px;
  text-decoration: none;
  text-align: center;
  color: black;
`;
//상단 질문제목 전체 영역
const TopQuestionTitle = styled.div`
  /* width: 60%; */
  width: calc(100% - 250px - 200px);
  /* height: 100px; */
  margin-right: 30px;
  align-items: start;
  padding-left: 10px;
  padding-right: 10px;
  /* background-color: aqua; */
`;
//질문제목 과 Ask 버튼
const AskQuestionContainer = styled.div`
  width: 100%;
  height: 80px;
  justify-content: space-between;
  border-bottom: 2px solid black;
  div {
    font-size: 20px;
  }
  /* background-color: red; */
`;
//Ask Question 버튼(질문하기버튼)
// const AskQuestion = styled.button`
//   width: 100px;
//   height: 20px;
//   background-color: #0a95ff;
//   border-radius: 2px;
//   border-color: #0078ff;
//   margin: 10px;
//   font-size: 5px;
// `;

// 질문정보(작성일, 수정일, 조회수)
const QuestionInform = styled.div`
  height: 40px;
  display: flex;
`;
// 질문 내용 전체 영역
const QuestionDetailTitle = styled.div`
  width: 100%;
  /* height: 130px; */
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
  /* background-color: blue; */
`;
// 질문 내용 칸
const QuestionContentText = styled.div`
  width: 100%;
  /* height: 120px; */
  font-size: 15px;
  background-color: #ffff;
  border: 1px solid black;
  /* margin-bottom: 50px; */
  /* background-color: olive; */
`;
const QuestionContentTextEdit = styled.textarea`
  width: 100%;
  /* height: 120px; */
  font-size: 15px;
  background-color: #ffff;
  border: 1px solid black;
  /* margin-bottom: 50px; */
  /* background-color: olive; */
`;
// 태그 전체
const TagContainer = styled.div`
  height: 30px;
  display: flex;
  align-items: end;
  justify-content: start;
  /* background-color: yellow; */
  margin: 10px;
`;
// 태그 버튼
const Tag = styled.button`
  /* width: 30%; */
  height: 20px;
  background-color: #d0e2f0;
  margin-left: 10px;
  border-radius: 5px;
  border-color: #d0e2f0;
  font-size: 5px;
`;
//질문 수정, 삭제 버튼 전체영역
const QuEDContainer = styled.div`
  width: 80%;
  height: 30px;
  display: flex;
  align-items: start;
  justify-content: start;
  /* background-color: yellow; */
  margin: 10px;
  margin-left: 72px;
`;
//질문 수정 버튼
const QuEdit = styled.button`
  /* width: 30%; */
  height: 20px;
  background-color: #d0e2f0;
  margin-left: 10px;
  border-radius: 5px;
  border-color: #d0e2f0;
  font-size: 5px;
`;
//질문 삭제버튼( 로그인과 회원가입 데이터 구축후..처리)
const QuDelete = styled.button`
  /* width: 30%; */
  height: 20px;
  background-color: #d0e2f0;
  margin-left: 10px;
  border-radius: 5px;
  border-color: #d0e2f0;
  font-size: 5px;
`;
//댓글 전체 영역
const CommentContent = styled.div`
  width: 100%;
  /* height: 150px; */
  margin-top: 30px;
  margin-bottom: 40px;
  padding-left: 50px;
  padding-right: 10px;
`;
//댓글
const CommentContentTitle = styled.div`
  width: 100%;
`;
// 댓글 내용 칸
const CommentContentInput = styled.input`
  width: 100%;
  height: 70%;
  text-align: start;
  font-size: 5px;
  background-color: #ffff;
  border: 0.3px solid black;
`;
// 등록된 답변 전체 영역
const AnswerContentTitle = styled.div`
  width: 100%;
  height: 130px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
  /* background-color: pink; */
`;
//등록된 답변
const AnswerContentText = styled.div`
  width: 100%;
  height: 120px;
  font-size: 15px;
  background-color: #ffff;
  border: 1px solid black;
  /* background-color: olive; */
`;
const AnswerContentTextEdit = styled.textarea`
  width: 100%;
  height: 120px;
  font-size: 15px;
  background-color: #ffff;
  border: 1px solid black;
  /* background-color: olive; */
`;
// 답변 수정, 삭제 버튼 전체영역
const AnEDContainer = styled.div`
  width: 80%;
  height: 30px;
  /* display: flex; */
  align-items: start;
  justify-content: start;
  /* background-color: yellow; */
  /* margin: 10px; */
  /* margin-left: 72px; */
`;
//답변 수정 버튼
const AnEdit = styled.button`
  /* width: 30%; */
  height: 20px;
  background-color: #d0e2f0;
  margin-left: 10px;
  border-radius: 5px;
  border-color: #d0e2f0;
  font-size: 5px;
`;
//답변 삭제버튼( 로그인과 회원가입 데이터 구축후..처리)
const AnDelete = styled.button`
  /* width: 30%; */
  height: 20px;
  background-color: #d0e2f0;
  margin-left: 10px;
  border-radius: 5px;
  border-color: #d0e2f0;
  font-size: 5px;
`;

// 답변 작성 전체 영역
const RegisterAnswerContent = styled.div`
  width: 100%;
  height: 160px;
  margin-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
`;
/* {Your Answer text부분} */
const RegisterAnswerTitle = styled.div`
  width: 100%;
`;

// 답변 작성 칸
const RegisterAnswerTextarea = styled.textarea`
  width: 100%;
  height: 120px;
  border: 1px solid black;
`;

// Post Your Answer 버튼
const RegisterAnswerbutton = styled.button`
  width: 40%;
  height: 20px;
  background-color: #0a95ff;
  border-radius: 2px;
  border-color: #0078ff;
  margin: 10px;
  font-size: 5px;
`;

// 필터버튼 전체영역
const FilterButtonContainer = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin-bottom: 20px;
`;
// 필터버튼((Interesting, Bountied, Hot, Week, Month))
const FilterButton = styled.button`
  height: 30px;
  margin-right: 3px;
`;

function QuestionDetail() {
  const location = useLocation();
  const { data, questionId } = location.state;

  const [bookMark, setBookMark] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [pageData, setPageData] = useState(null);
  const [pageDataAnswer, setPageDataAnswer] = useState([]);
  const [yourAnswer, setYourAnswer] = useState(''); // 답변 등록용

  useEffect(() => {
    console.log('data', data);
    // setPageData(data);
    init(questionId);
  }, []);

  useEffect(() => {
    console.log('pageData', pageData);
    console.log('pageDataAnswer', pageDataAnswer);
  }, [pageData, pageDataAnswer]);

  // 초기 데이터 통신 호출
  const init = async (questionId) => {
    const result = await axios.get(`/questions/${questionId}`);
    console.log('init', result);

    // edit 상태 추가
    result.data.editState = false;
    for (let i = 0; i < result.data.answer.length; i++) {
      result.data.answer[i].editState = false;
    }

    setPageData(result.data);
    setPageDataAnswer(result.data.answer.reverse());
  };
  // 북마크의 상태 변경
  const changeStateBookMark = () => {
    setBookMark((e) => !e);
  };

  // 추천수 업
  const likeUp = () => {
    setLikeCount((e) => e + 1);
  };
  // 추천수 다운
  const likeDown = () => {
    setLikeCount((e) => e - 1);
  };
  // 답변 달기
  const answerPost = async () => {
    if (yourAnswer == '') {
      alert('답변을 입력하세요');
    } else {
      // 통신 처리
      const body = {
        // TODO : memberId change
        memberId: pageData.memberId,
        questionId: pageData.id,
        content: yourAnswer,
      };
      const result = await axios.post('/answers', body);
      console.log('result', result);
      // 답변 등록후 초기화하여 화면 업데이트
      init(questionId);
      // 답변 내용 초기화
      setYourAnswer('');
    }
  };
  // 추천순 필터
  const like_filter = () => {
    console.log('추천순 필터');
    let temp = [...pageDataAnswer];
    let result = temp.sort((a, b) => {
      if (a.score > b.score) return 1;
      if (a.score === b.score) return 0;
      if (a.score < b.score) return -1;
    });
    console.log('result', result);
    setPageDataAnswer(result);
  };
  // 최근순 필터
  const timeline_filter = () => {
    console.log('최근순 필터');
    let temp = [...pageDataAnswer];
    let result = temp.sort((a, b) => {
      let timestamp_a = new Date(a.createdAt).getTime();
      let timestamp_b = new Date(b.createdAt).getTime();
      if (timestamp_a > timestamp_b) return 1;
      if (timestamp_a === timestamp_b) return 0;
      if (timestamp_a < timestamp_b) return -1;
    });
    console.log('result', result);
    setPageDataAnswer(result);
  };
  // 질문 / 답변 추천 비추천
  const like_unlike = async (type, updown, id) => {
    // type ('questions', 'answers')
    // updown ('upvotes', 'downvotes')
    const result = await axios.patch(`/${type}/${id}/${updown}`, {
      memberId: 1,
    });
    console.log('result', result.data);
    // 작동후 초기화하여 화면 업데이트
    init(questionId);
  };
  // editState 상태 변경
  const editStateChange = (type, arrayIndex) => {
    if (type == 'questions') {
      const temp = { ...pageData };
      temp.editState = !temp.editState;
      console.log(temp);
      setPageData(temp);
    } else if (type == 'answers') {
      const temp = [...pageDataAnswer];
      temp[arrayIndex].editState = !temp[arrayIndex].editState;
      setPageDataAnswer(temp);
    }
  };
  // 질문 / 답변 수정
  const modify = async (type, Id, title, content, answerId) => {
    // type (questions / answers)
    const result = await axios.patch(
      type == 'questions' ? `/${type}/${Id}` : `/${type}/${answerId}`,
      type == 'questions'
        ? {
            Id,
            title,
            content,
          }
        : {
            id: answerId,
            questionId: Id,
            content,
          }
    );
    console.log('result', result.data);
    // 작동후 초기화하여 화면 업데이트
    init(questionId);
  };

  return (
    <>
      <LoginHeader />
      <div style={{ display: 'flex' }}>
        <LeftSidebar />
        {/* 데이터 적용전까지 대기 */}
        {pageData != null ? (
          //상단 질문제목 전체영역
          <TopQuestionTitle>
            <AskQuestionContainer>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                {/* 질문 제목 */}
                <div>{pageData.title}</div>
                {/* //AskQuestion 버튼과 라우터 연결(질문작성페이지 이동) */}
                <SLinkquestion to="/addquestion">Ask Question</SLinkquestion>
              </div>

              {/* 질문 정보 */}
              <div>
                <QuestionInform>
                  <div
                    style={{
                      display: 'flex',
                      fontSize: 12,
                      alignItems: 'center',
                      marginRight: 5,
                    }}
                  >
                    작성일: {pageData.createdAt.slice(0, 10)}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      fontSize: 12,
                      alignItems: 'center',
                      marginRight: 5,
                    }}
                  >
                    수정일: {pageData.modifiedAt.slice(0, 10)}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      fontSize: 12,
                      alignItems: 'center',
                    }}
                  >
                    조회수: 0
                  </div>
                </QuestionInform>
              </div>
              {/* 질문 정보 */}
            </AskQuestionContainer>
            {/* 상단 질문제목 전체영역 끝 */}

            {/* <등록된 질문 내용 칸> */}
            <QuestionDetailTitle>
              {/* 추천 영역 */}
              <div style={{ width: '10%', paddingRight: 10 }}>
                {/* 질문추천(위) */}
                <button
                  style={{
                    border: 'none',
                    width: '100%',
                    backgroundColor: 'white',
                  }}
                  onClick={() => {
                    like_unlike('questions', 'upvotes', pageData.id);
                  }}
                >
                  <TiArrowSortedUp />
                </button>
                {/* 질문추천수(=투표수) */}
                <div
                  style={{
                    //   display: 'flex',
                    //   alignItems: 'center',
                    //   justifyContent: 'center',
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  {/* {likeCount} */}
                  {pageData.score}
                </div>
                {/* 질문비추천(아래) */}
                <button
                  style={{
                    border: 'none',
                    width: '100%',
                    backgroundColor: 'white',
                  }}
                  onClick={() => {
                    like_unlike('questions', 'downvotes', pageData.id);
                  }}
                >
                  <TiArrowSortedDown />
                </button>
                <button
                  style={{
                    border: 'none',
                    width: '100%',
                    backgroundColor: 'white',
                  }}
                  onClick={() => {
                    changeStateBookMark();
                  }}
                >
                  {bookMark == true ? <BsBookmarkFill /> : <BsBookmark />}
                </button>
              </div>
              {pageData.editState == false ? (
                <QuestionContentText>
                  <div style={{ margin: '10px' }}>{pageData.content}</div>
                  {/* 질문 태그 */}
                  <TagContainer>
                    <Tag onClick={() => console.log(pageData, pageDataAnswer)}>
                      Tag
                    </Tag>
                    <Tag>Tag</Tag>
                    <Tag>Tag</Tag>
                  </TagContainer>
                  {/* 질문태그 끝 */}
                </QuestionContentText>
              ) : (
                <QuestionContentTextEdit
                  defaultValue={pageData.content}
                  onChange={(e) => {
                    let temp = { ...pageData };
                    temp.content = e.target.value;
                    setPageData(temp);
                  }}
                ></QuestionContentTextEdit>
              )}
            </QuestionDetailTitle>
            {/* 질문 수정,삭제 영역 */}
            {pageData.editState == false ? (
              <QuEDContainer>
                <QuEdit onClick={() => editStateChange('questions')}>
                  Edit
                </QuEdit>
                <QuDelete>Delete</QuDelete>
              </QuEDContainer>
            ) : (
              <QuEDContainer>
                <QuEdit
                  onClick={() =>
                    modify(
                      'questions',
                      pageData.id,
                      pageData.title,
                      pageData.content
                    )
                  }
                >
                  Confirm
                </QuEdit>
                <QuEdit onClick={() => editStateChange('questions')}>
                  Cancel
                </QuEdit>
                <QuDelete>Delete</QuDelete>
              </QuEDContainer>
            )}
            {/* 질문 수정,삭제 영역 */}

            {/* <댓글> */}
            <CommentContent>
              {/* <CommentContentTitle>
              <div style={{ padding: '5px' }}>댓글</div>
            </CommentContentTitle>
            <CommentContentInput></CommentContentInput> */}
              {/* 댓글 더미데이터 */}
              <div style={{ fontSize: 12 }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum. - <span style={{ color: 'blue' }}>작성자</span>
                ,&nbsp;
                <span style={{ color: 'gray' }}>작성일</span>
              </div>
            </CommentContent>
            {/* <댓글 끝> */}

            {/* 답변수 */}
            <div>
              <h4>{pageDataAnswer.length} Answers</h4>
            </div>
            {/* 필터버튼 전체영역 */}
            <FilterButtonContainer>
              {/* 필터버튼 */}
              <FilterButton onClick={() => like_filter()}>추천순</FilterButton>
              <FilterButton onClick={() => timeline_filter()}>
                최근순
              </FilterButton>
            </FilterButtonContainer>

            {/* 답변 반복문 */}
            {pageDataAnswer.map((item, index) => {
              return (
                <AnswerContentTitle key={index}>
                  {/* 추천 영역 */}
                  <div style={{ width: '10%', paddingRight: 10 }}>
                    {/* 답변 추천(위) */}
                    <button
                      style={{
                        border: 'none',
                        width: '100%',
                        backgroundColor: 'white',
                      }}
                      onClick={() => {
                        like_unlike('answers', 'upvotes', item.id);
                      }}
                    >
                      <TiArrowSortedUp />
                    </button>
                    {/* 추천수(=투표수) */}
                    <div
                      style={{
                        //   display: 'flex',
                        //   alignItems: 'center',
                        //   justifyContent: 'center',
                        width: '100%',
                        textAlign: 'center',
                      }}
                    >
                      {item.score}
                    </div>
                    {/* 답변 비추천(아래) */}
                    <button
                      style={{
                        border: 'none',
                        width: '100%',
                        backgroundColor: 'white',
                      }}
                      onClick={() => {
                        like_unlike('answers', 'downvotes', item.id);
                      }}
                    >
                      <TiArrowSortedDown />
                    </button>
                    {/* 북마크  기능 */}
                    <button
                      style={{
                        border: 'none',
                        width: '100%',
                        backgroundColor: 'white',
                      }}
                      onClick={() => {
                        changeStateBookMark();
                      }}
                    >
                      {bookMark == true ? <BsBookmarkFill /> : <BsBookmark />}
                    </button>
                  </div>
                  {item.editState == false ? (
                    <AnswerContentText>
                      <div style={{ padding: '10px', height: '70%' }}>
                        {item.content}
                      </div>
                    </AnswerContentText>
                  ) : (
                    <AnswerContentTextEdit
                      defaultValue={item.content}
                      onChange={(e) => {
                        let temp = [...pageDataAnswer];
                        temp[index].content = e.target.value;
                        setPageDataAnswer(temp);
                      }}
                    ></AnswerContentTextEdit>
                  )}
                  {/* 답변 수정,삭제버튼*/}
                  {item.editState == false ? (
                    <AnEDContainer>
                      <AnEdit onClick={() => editStateChange('answers', index)}>
                        Edit
                      </AnEdit>
                      <AnDelete>Delete</AnDelete>
                    </AnEDContainer>
                  ) : (
                    <AnEDContainer>
                      <AnEdit
                        onClick={() =>
                          modify(
                            'answers',
                            pageData.id,
                            '',
                            item.content,
                            item.id
                          )
                        }
                      >
                        Confirm
                      </AnEdit>
                      <AnEdit onClick={() => editStateChange('answers', index)}>
                        Cancel
                      </AnEdit>
                      <AnDelete>Delete</AnDelete>
                    </AnEDContainer>
                  )}
                  {/* 답변 수정,삭제버튼 끝 */}
                </AnswerContentTitle>
              );
            })}
            {/* 질문 영역 끝 */}

            {/* 답변 등록 영역 전체영역*/}
            {/* Your Answer 글씨 */}
            <RegisterAnswerContent>
              <RegisterAnswerTitle>
                <div style={{ padding: '5px' }}>Your Answer</div>
              </RegisterAnswerTitle>

              {/* 답변 작성 칸 */}
              <RegisterAnswerTextarea
                value={yourAnswer}
                onChange={(e) => setYourAnswer(e.target.value)}
              ></RegisterAnswerTextarea>
            </RegisterAnswerContent>
            {/* 답변 등록 영역 전체영역 끝*/}

            {/* 답변 저장 버튼 */}
            <RegisterAnswerbutton onClick={() => answerPost()}>
              Post Your Answer{' '}
            </RegisterAnswerbutton>
            {/* 답변 저장 버튼 끝 */}
          </TopQuestionTitle> //질문 전체 영역 끝
        ) : (
          <div>Loading...</div>
        )}
        <RightSidebar />
      </div>
      <Footer />
    </>
  );
}
export default QuestionDetail;
