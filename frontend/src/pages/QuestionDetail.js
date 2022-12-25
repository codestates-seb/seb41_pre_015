/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import LoginHeader from '../component/LoginHeader';
import LeftSidebar from '../component/LeftSidebar';
import RightSidebar from '../component/RightSidebar';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';

//{상단 질문제목 전체 칸}
const TopQuestionTitle = styled.div`
  width: 60%;
  height: 100px;
  /* border: 1px solid black; */
  /* display: flex; */
  /* margin-left: 30px; */
  margin-right: 30px;
  /* padding: 30px; */
  /* margin-bottom: 10px; */
  /* border-width: 0.2px; */
  align-items: start;
  padding-left: 10px;
  padding-right: 10px;
  /* background-color: aqua; */
`;
//{질문제목 과 Ask 버튼}
const AskQuestionContainer = styled.div`
  width: 100%;
  height: 80px;
  /* display: flex; */
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
  /* width: 100px; */
  height: 40px;
  /* background-color: orange; */
  /* margin: 10px; */
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
  /* border-radius: 5px; */
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
  /* display: flex; */
  margin-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
  /* justify-content: space-between; */
`;

const AnswerContentTitle = styled.div`
  width: 100%;
  /* height: 200px; */
  /* background-color: pink; */
  /* display: flex; */
`;
const AnswerContentInput = styled.input`
  width: 100%;
  height: 120px;
  border: 1px solid black;
  /* border-radius: 5px; */
  /* border-color: #b4e5ff; */
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
            <div style={{ width: '10%' }}>
              {/* 위 */}
              <button
                style={{ border: 'none' }}
                onClick={() => {
                  alert('눌림');
                }}
              >
                <TiArrowSortedUp />
              </button>
              {/* 추천수 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                0
              </div>
              {/* 아래 */}
              <button
                style={{ border: 'none' }}
                onClick={() => {
                  alert('눌림');
                }}
              >
                <TiArrowSortedDown />
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
