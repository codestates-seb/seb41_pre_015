/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import styled from 'styled-components';
import LoginHeader from '../component/LoginHeader';
import LeftSidebar from '../component/LeftSidebar';
import RightSidebar from '../component/RightSidebar';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';

//{상단 질문제목 전체 칸}
const TopQuestionTitle = styled.div`
  width: 60%;
  height: 100px;
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
const QuestionInform = styled.div`
  height: 40px;
  display: flex;
`;
const QuestionDetailTitle = styled.div`
  width: 100%;
  height: 130px;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
  /* background-color: greenyellow; */
`;
const QuestionContentText = styled.div`
  width: 100%;
  height: 120px;
  font-size: 15px;
  background-color: #ffff;
  border: 1px solid black;
  /* background-color: olive; */
`;

const TagContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: start;
  justify-content: start;
  /* background-color: yellow; */
  margin: 10px;
`;

const Tag = styled.button`
  /* width: 30%; */
  height: 20px;
  background-color: #d0e2f0;
  margin-left: 10px;
  border-radius: 5px;
  border-color: #d0e2f0;
  font-size: 5px;
`;
const AnswerContent = styled.div`
  width: 100%;
  height: 160px;
  /* background-color: purple; */
  margin-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
`;

const AnswerContentTitle = styled.div`
  width: 100%;
  /* background-color: pink; */
`;
const AnswerContentInput = styled.input`
  width: 100%;
  height: 120px;
  border: 1px solid black;
`;

const AnswerQuestion = styled.button`
  width: 40%;
  height: 20px;
  background-color: #0a95ff;
  border-radius: 2px;
  border-color: #0078ff;
  margin: 10px;
  font-size: 5px;
`;

function QuestionDetail() {
  const [bookMark, setBookMark] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

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

  return (
    <>
      <LoginHeader />
      <div style={{ display: 'flex' }}>
        <LeftSidebar />
        <TopQuestionTitle>
          <AskQuestionContainer>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>질문제목</div>
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
                  작성일: today
                </div>
                <div
                  style={{
                    display: 'flex',
                    fontSize: 12,
                    alignItems: 'center',
                    marginRight: 5,
                  }}
                >
                  수정일:today
                </div>
                <div
                  style={{
                    display: 'flex',
                    fontSize: 12,
                    alignItems: 'center',
                  }}
                >
                  조회수:0
                </div>
              </QuestionInform>
            </div>
          </AskQuestionContainer>

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
                {likeCount}
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
              <div style={{ padding: '10px', height: '70%' }}>질문내용</div>
              <TagContainer>
                <Tag>Tag</Tag>
                <Tag>Tag</Tag>
                <Tag>Tag</Tag>
              </TagContainer>
            </QuestionContentText>
          </QuestionDetailTitle>
          <AnswerContent>
            <AnswerContentTitle>
              <div style={{ padding: '5px' }}>Your Answer</div>
            </AnswerContentTitle>
            <AnswerContentInput></AnswerContentInput>
          </AnswerContent>
          <AnswerQuestion>Post Your Answer </AnswerQuestion>
        </TopQuestionTitle>
        <RightSidebar />
      </div>
    </>
  );
}
export default QuestionDetail;
