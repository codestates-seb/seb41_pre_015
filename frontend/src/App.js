/* eslint-disable import/default */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import './App.css';
import styled from 'styled-components';
// import Header from './header';
import LoginHeader from './component/LoginHeader.js';
import MainQuesTions from './component/MainQuesTions';

function App() {
  // 헤더
  // const Header = styled.div`
  //   width: 100%;
  //   height: 50px;
  //   background-color: red;
  // `;

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
    /* background-color: black; */
  `;
  const QuestionTitleTop = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: wheat;
    text-align: center;
    margin: auto;
  `;
  // const QuestionTitleTopButton = styled.button`
  //   width: 100px;
  //   height: 50px;
  //   background-color: blue;
  // `;
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
    height: 110px;
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
    justify-content: center;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 5px;
  `;
  // 내용 우측
  const QuestionContentTopRight = styled.div`
    width: 80%;
    height: 110px;
    /* display: flex;
    align-items: center;
    justify-items: center; */
    background-color: greenyellow;
  `;
  // 상세 내용
  const QuestionContentTopRightContent = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    /* align-items: center;
    justify-items: center; */
    text-align: center;
    padding-left: 20px;
    font-size: 15px;
    background-color: red;
  `;
  // 태그
  const QuestionContentTopRightTag = styled.div`
    width: 100%;
    height: 10px;
    background-color: greenyellow;
  `;
  // 작성자
  const QuestionContentWriter = styled.div`
    width: 100%;
    height: 20px;
    background-color: yellowgreen;
  `;

  // 우측
  const SectionRight = styled.div`
    width: 30%;
    height: 100%;
  `;
  // const ADTop = styled.div`
  //   width: 200px;
  //   height: 300px;
  //   background-color: yellow;
  // `;
  // const ADBottom = styled.div`
  //   width: 200px;
  //   height: 200px;
  //   background-color: orangered;
  // `;

  return (
    <>
      {/* 헤더 */}
      <LoginHeader />
      {/* 사이드바와 컨테이너를 포함 */}
      <Page>
        {/* 가장 최상단 div */}
        <Container>
          {/* 좌측 섹션 */}
          <SectionLeft>
            {/* 자주 묻는 질문 목록 */}
            <MainQuesTions></MainQuesTions>
          </SectionLeft>

          {/* 우측 섹션 */}
          {/* <SectionRight> */}
          {/* 광고1 */}
          {/* <ADTop></ADTop> */}
          {/* 광고2 */}
          {/* <ADBottom></ADBottom> */}
          {/* </SectionRight> */}
        </Container>
      </Page>
      {/* <MainQuesTions /> */}
    </>
  );
}

export default App;
