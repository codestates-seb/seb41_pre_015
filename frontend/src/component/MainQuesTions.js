/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import styled from 'styled-components';

const Sidebar = styled.div`
  width: 100px;
  height: 100vh;
  background-color: green;
`;
// 사이드바와 컨테이너를 포함
const Page = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  /* background-color: olive; */
`;

// 작업 전체 영역
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;
// 좌측
const SectionLeft = styled.div`
  width: 70%;
  height: 100%;
`;
const QuestionTitle = styled.div`
  width: 100%;
  height: 100px;
  background-color: black;
`;
const QuestionTitleTop = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background-color: wheat; */
  text-align: center;
  margin: auto;
`;
const QuestionTitleTopButton = styled.button`
  width: 100px;
  height: 30px;
  background-color: #0a95ff;
  border-radius: 2px;
  border-color: #0078ff;
`;
const QuestionTitleBottom = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: end;
  background-color: peru;
`;
const QuestionTitleBottomButtonTag = styled.button`
  height: 30px;
  background-color: gray;
`;
const QuestionTitleBottomButtonWhite = styled.button`
  height: 30px;
`;
const QuestionContent = styled.div`
  width: 100%;
  height: 130px;
  background-color: pink;
`;
// 내용 상단
const QuestionContentTop = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  background-color: yellow;
`;
// 내용 좌측
const QuestionContentTopLeft = styled.div`
  width: 20%;
  height: 110px;
  background-color: pink;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  padding-left: 10px;
  font-size: 5px;
`;
// 내용 우측
const QuestionContentTopRight = styled.div`
  width: 80%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-items: center;
  background-color: greenyellow;
`;
// 상세 내용
const QuestionContentTopRightContent = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  text-align: center;
  padding-left: 20px;
  font-size: 15px;
  background-color: red;
`;
// 태그
const QuestionContentTopRightTag = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  background-color: orchid;
`;
const QuestionContentTopRightTagButtonButton = styled.button`
  width: 20;
  height: 20px;
  background-color: #d0e2f0;
`;
// 작성자
const QuestionContentWriter = styled.div`
  width: 100%;
  height: 20px;
  /* background-color: yellowgreen; */
`;

// 우측
const SectionRight = styled.div`
  width: 30%;
  height: 100%;
`;
const ADTop = styled.div`
  width: 100%;
  height: 300px;
  background-color: yellow;
`;
const ADBottom = styled.div`
  width: 100%;
  height: 200px;
  background-color: orangered;
`;
const MainQuestions = () => {
  return (
    <>
      {/* 자주 묻는 질문 목록 */}
      <QuestionTitle>
        <QuestionTitleTop>
          <QuestionTitleTopButton>Ask Question</QuestionTitleTopButton>
        </QuestionTitleTop>
        <QuestionTitleBottom>
          <QuestionTitleBottomButtonWhite>
            Interesting
          </QuestionTitleBottomButtonWhite>
          <QuestionTitleBottomButtonWhite>
            Bountied
          </QuestionTitleBottomButtonWhite>
          <QuestionTitleBottomButtonWhite>Hot</QuestionTitleBottomButtonWhite>
          <QuestionTitleBottomButtonWhite>Week</QuestionTitleBottomButtonWhite>
          <QuestionTitleBottomButtonWhite>Month</QuestionTitleBottomButtonWhite>
        </QuestionTitleBottom>
      </QuestionTitle>
      {/* 전체 내용 */}
      <QuestionContent>
        {/* 내용 상단 */}
        <QuestionContentTop>
          {/* 내용 좌측 */}
          <QuestionContentTopLeft>
            <div>
              <h3>0 votes</h3>
              <h3>0 answers</h3>
              <h3>2 views</h3>
            </div>
          </QuestionContentTopLeft>
          {/* 내용 우측 */}
          <QuestionContentTopRight>
            {/* 상세 내용 */}
            <QuestionContentTopRightContent>
              <h4>IActionResult not returning string response as string</h4>
            </QuestionContentTopRightContent>
            {/* 태그 */}
            <QuestionContentTopRightTag>
              <QuestionContentTopRightTagButtonButton>
                node.js
              </QuestionContentTopRightTagButtonButton>
              <QuestionContentTopRightTagButtonButton>
                react.js
              </QuestionContentTopRightTagButtonButton>
              <QuestionContentTopRightTagButtonButton>
                C ++
              </QuestionContentTopRightTagButtonButton>
            </QuestionContentTopRightTag>
          </QuestionContentTopRight>
        </QuestionContentTop>
        {/* 작성자 */}
        <QuestionContentWriter></QuestionContentWriter>
      </QuestionContent>
      {/* 전체 내용 */}
      <QuestionContent>
        {/* 내용 상단 */}
        <QuestionContentTop>
          {/* 내용 좌측 */}
          <QuestionContentTopLeft>
            <div>
              <h3>0 votes</h3>
              <h3>0 answers</h3>
              <h3>2 views</h3>
            </div>
          </QuestionContentTopLeft>
          {/* 내용 우측 */}
          <QuestionContentTopRight>
            {/* 상세 내용 */}
            <QuestionContentTopRightContent>
              <h4>IActionResult not returning string response as string</h4>
            </QuestionContentTopRightContent>
            {/* 태그 */}
            <QuestionContentTopRightTag>
              <QuestionContentTopRightTagButtonButton>
                node.js
              </QuestionContentTopRightTagButtonButton>
              <QuestionContentTopRightTagButtonButton>
                java
              </QuestionContentTopRightTagButtonButton>
              <QuestionContentTopRightTagButtonButton>
                c
              </QuestionContentTopRightTagButtonButton>
            </QuestionContentTopRightTag>
          </QuestionContentTopRight>
        </QuestionContentTop>
        {/* 작성자 */}
        <QuestionContentWriter></QuestionContentWriter>
      </QuestionContent>
      {/* 전체 내용 */}
      <QuestionContent>
        {/* 내용 상단 */}
        <QuestionContentTop>
          {/* 내용 좌측 */}
          <QuestionContentTopLeft>
            <div>
              <h3>0 votes</h3>
              <h3>0 answers</h3>
              <h3>2 views</h3>
            </div>
          </QuestionContentTopLeft>
          {/* 내용 우측 */}
          <QuestionContentTopRight>
            {/* 상세 내용 */}
            <QuestionContentTopRightContent>
              <h4>IActionResult not returning string response as string</h4>
            </QuestionContentTopRightContent>
            {/* 태그 */}
            <QuestionContentTopRightTag>
              <QuestionContentTopRightTagButtonButton>
                node.js
              </QuestionContentTopRightTagButtonButton>
              <QuestionContentTopRightTagButtonButton>
                java
              </QuestionContentTopRightTagButtonButton>
              <QuestionContentTopRightTagButtonButton>
                c
              </QuestionContentTopRightTagButtonButton>
            </QuestionContentTopRightTag>
          </QuestionContentTopRight>
        </QuestionContentTop>
        {/* 작성자 */}
        <QuestionContentWriter></QuestionContentWriter>
      </QuestionContent>
      {/* 전체 내용 */}
      <QuestionContent>
        {/* 내용 상단 */}
        <QuestionContentTop>
          {/* 내용 좌측 */}
          <QuestionContentTopLeft>
            <div>
              <h3>0 votes</h3>
              <h3>0 answers</h3>
              <h3>2 views</h3>
            </div>
          </QuestionContentTopLeft>
          {/* 내용 우측 */}
          <QuestionContentTopRight>
            {/* 상세 내용 */}
            <QuestionContentTopRightContent>
              <h4>IActionResult not returning string response as string</h4>
            </QuestionContentTopRightContent>
            {/* 태그 */}
            <QuestionContentTopRightTag>
              <QuestionContentTopRightTagButtonButton>
                node.js
              </QuestionContentTopRightTagButtonButton>
              <QuestionContentTopRightTagButtonButton>
                java
              </QuestionContentTopRightTagButtonButton>
              <QuestionContentTopRightTagButtonButton>
                c
              </QuestionContentTopRightTagButtonButton>
            </QuestionContentTopRightTag>
          </QuestionContentTopRight>
        </QuestionContentTop>
        {/* 작성자 */}
        <QuestionContentWriter></QuestionContentWriter>
      </QuestionContent>
    </>
  );
};

export default MainQuestions;
