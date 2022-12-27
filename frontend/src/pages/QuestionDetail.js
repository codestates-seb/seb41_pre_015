/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import LoginHeader from '../component/LoginHeader';
import LeftSidebar from '../component/LeftSidebar';
import RightSidebar from '../component/RightSidebar';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import Footer from '../component/Footer';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

//{상단 질문제목 전체 칸}
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
//{질문제목 과 Ask 버튼}
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
//{Ask 버튼}
const AskQuestion = styled.button`
  width: 100px;
  height: 20px;
  background-color: #0a95ff;
  border-radius: 2px;
  border-color: #0078ff;
  margin: 10px;
  font-size: 5px;
`;
// {작성일, 수정일, 조회수}
const QuestionInform = styled.div`
  height: 40px;
  display: flex;
`;
// {질문 내용 전체 영역}
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
// {질문 내용 칸}
const QuestionContentText = styled.div`
  width: 100%;
  /* height: 120px; */
  font-size: 15px;
  background-color: #ffff;
  border: 1px solid black;
  /* margin-bottom: 50px; */
  /* background-color: olive; */
`;
// {태그 전체}
const TagContainer = styled.div`
  height: 30px;
  display: flex;
  align-items: end;
  justify-content: start;
  /* background-color: yellow; */
  margin: 10px;
`;
// {태그 버튼}
const Tag = styled.button`
  /* width: 30%; */
  height: 20px;
  background-color: #d0e2f0;
  margin-left: 10px;
  border-radius: 5px;
  border-color: #d0e2f0;
  font-size: 5px;
`;
// <수정, 삭제 버튼>
const EDContainer = styled.div`
  width: 80%;
  height: 30px;
  display: flex;
  align-items: start;
  justify-content: start;
  /* background-color: yellow; */
  margin: 10px;
  margin-left: 72px;
`;
const Edit = styled.button`
  /* width: 30%; */
  height: 20px;
  background-color: #d0e2f0;
  margin-left: 10px;
  border-radius: 5px;
  border-color: #d0e2f0;
  font-size: 5px;
`;
const Delete = styled.button`
  /* width: 30%; */
  height: 20px;
  background-color: #d0e2f0;
  margin-left: 10px;
  border-radius: 5px;
  border-color: #d0e2f0;
  font-size: 5px;
`;
//{댓글 전체 영역}
const CommentContent = styled.div`
  width: 100%;
  /* height: 150px; */
  margin-top: 30px;
  margin-bottom: 40px;
  padding-left: 50px;
  padding-right: 10px;
`;
const CommentContentTitle = styled.div`
  width: 100%;
`;
// {댓글 내용 칸 }
const CommentContentInput = styled.input`
  width: 100%;
  height: 70%;
  text-align: start;
  font-size: 5px;
  background-color: #ffff;
  border: 0.3px solid black;
`;
// {등록된 답변 전체 영역}
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
const AnswerContentText = styled.div`
  width: 100%;
  height: 120px;
  font-size: 15px;
  background-color: #ffff;
  border: 1px solid black;
  /* background-color: olive; */
`;

// {답변 작성 전체 영역}
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
// {답변 작성 칸}
const RegisterAnswerInput = styled.input`
  width: 100%;
  height: 120px;
  border: 1px solid black;
`;
// {Post Your Answer 버튼}
const RegisterAnswerbutton = styled.button`
  width: 40%;
  height: 20px;
  background-color: #0a95ff;
  border-radius: 2px;
  border-color: #0078ff;
  margin: 10px;
  font-size: 5px;
`;

function QuestionDetail() {
  const location = useLocation();
  const { data, questionId } = location.state;

  const [bookMark, setBookMark] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [pageData, setPageData] = useState(null);
  const [yourAnswer, setYourAnswer] = useState(''); // 답변 등록용

  useEffect(() => {
    console.log('data', data);
    // setPageData(data);
    init(questionId);
  }, []);

  // 초기 데이터 통신 호출
  const init = async (questionId) => {
    const result = await axios.get(`/questions/${questionId}`);
    console.log('init', result);
    setPageData(result.data);
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
      // 답변 내용 초기화
      setYourAnswer('');
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
    }
  };

  return (
    <>
      <LoginHeader />
      <div style={{ display: 'flex' }}>
        <LeftSidebar />
        {/* 데이터 적용전까지 대기 */}
        {pageData != null ? (
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
                <AskQuestion>Ask Question</AskQuestion>
              </div>
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
            </AskQuestionContainer>

            {/* <등록된 질문 내용 칸> */}
            <QuestionDetailTitle>
              {/* 추천 영역 */}
              <div style={{ width: '10%', paddingRight: 10 }}>
                {/* 위 */}
                <button
                  style={{
                    border: 'none',
                    width: '100%',
                    backgroundColor: 'white',
                  }}
                  onClick={() => {
                    likeUp();
                  }}
                >
                  <TiArrowSortedUp />
                </button>
                {/* 추천수 */}
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
                {/* 아래 */}
                <button
                  style={{
                    border: 'none',
                    width: '100%',
                    backgroundColor: 'white',
                  }}
                  onClick={() => {
                    likeDown();
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
              <QuestionContentText>
                <div style={{ margin: '10px' }}>{pageData.content}</div>
                <TagContainer>
                  <Tag>Tag</Tag>
                  <Tag>Tag</Tag>
                  <Tag>Tag</Tag>
                </TagContainer>
              </QuestionContentText>
            </QuestionDetailTitle>
            <EDContainer>
              <Edit>Edit</Edit>
              <Delete>Delete</Delete>
            </EDContainer>
            {/* <댓글> */}
            <CommentContent>
              {/* <CommentContentTitle>
              <div style={{ padding: '5px' }}>댓글</div>
            </CommentContentTitle>
            <CommentContentInput></CommentContentInput> */}
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

            {/* 답변수 */}
            <div>
              <h4>{pageData.answer.length} Answers</h4>
            </div>

            {/* 답변 반복문 */}
            {pageData.answer.map((item, index) => {
              return (
                <AnswerContentTitle key={index}>
                  {/* 추천 영역 */}
                  <div style={{ width: '10%', paddingRight: 10 }}>
                    {/* 위 */}
                    <button
                      style={{
                        border: 'none',
                        width: '100%',
                        backgroundColor: 'white',
                      }}
                      onClick={() => {
                        likeUp();
                      }}
                    >
                      <TiArrowSortedUp />
                    </button>
                    {/* 추천수 */}
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
                    {/* 아래 */}
                    <button
                      style={{
                        border: 'none',
                        width: '100%',
                        backgroundColor: 'white',
                      }}
                      onClick={() => {
                        likeDown();
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
                  <AnswerContentText>
                    <div style={{ padding: '10px', height: '70%' }}>
                      {item.content}
                    </div>
                  </AnswerContentText>
                </AnswerContentTitle>
              );
            })}

            {/* <답변 등록 칸> */}
            <RegisterAnswerContent>
              <RegisterAnswerTitle>
                <div style={{ padding: '5px' }}>Your Answer</div>
              </RegisterAnswerTitle>
              <RegisterAnswerInput
                onChange={(e) => setYourAnswer(e.target.value)}
              ></RegisterAnswerInput>
            </RegisterAnswerContent>
            <RegisterAnswerbutton onClick={() => answerPost()}>
              Post Your Answer{' '}
            </RegisterAnswerbutton>
          </TopQuestionTitle>
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
