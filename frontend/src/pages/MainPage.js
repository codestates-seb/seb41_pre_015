/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import logo from '../images/small-logo.png';
import LoginHeader from '../component/LoginHeader';
import LeftSidebar from '../component/LeftSidebar';
import RightSidebar from '../component/RightSidebar';
import MainQuestions from '../component/MainQuesTions';
// import Footer from '../component/Footer';

const TopQuestionMain = styled.div`
  width: 100%;
  height: 200%;
  /* padding-left: 10px; */
  padding-right: 20px;
`;
const TopQuestionTitle = styled.div`
  /* width: 600px; */
  width: 100%;
  height: 110px;
  border: 1px solid black;
  /* display: grid; */
  /* margin-left: 10px; */
  margin-bottom: 10px;
  border-width: 0.3px;
`;

const AskQuestionContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  div {
    font-size: 30px;
  }
`;

const AskQuestion = styled.button`
  /* width: 140px; */
  width: 35%;
  height: 30px;
  background-color: #0a95ff;
  border-radius: 2px;
  border-color: #0078ff;
  margin: 10px;
`;
const FilterButtonContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin-bottom: 10px;
`;
const FilterButton = styled.button`
  height: 30px;
  margin-right: 3px;
`;
const QuestionTitleBottomButtonTag = styled.button`
  height: 30px;
  background-color: gray;
`;

const QuestionList = styled.div`
  /* width: 600px; */
  width: 100%;
  height: 130px;
  border: 1px solid black;
  display: flex;
  margin-left: 10px;
`;

// 내용 좌측
const QuestionContentLeft = styled.div`
  width: 100%;
  height: 131.9px;
  /* background-color: pink; */
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  font-size: 5px;
`;
// 내용 우측
const TagContainer = styled.div`
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
// 상세 내용
const QuestionContentMiddle = styled.div`
  text-align: center;
  font-size: 15px;
  /* background-color: red; */
  width: 340px;
`;

const Tag = styled.button`
  width: 20%;
  height: 20px;
  background-color: #d0e2f0;
  margin-left: 10px;
`;
// 작성자
const QuestionImg = styled.div`
  width: 150%;
  height: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 20%;
  height: 20px;
`;

// 우측
const SectionRight = styled.div`
  width: 30%;
  height: 100%;
`;

const MainPage = () => {
  return (
    <>
      <LoginHeader />
      <div style={{ display: 'flex' }}>
        <LeftSidebar />

        <TopQuestionMain>
          <TopQuestionTitle>
            <AskQuestionContainer>
              <div style={{ margin: '5px' }}>Top Questions</div>
              <AskQuestion>Ask Question</AskQuestion>
            </AskQuestionContainer>
            <FilterButtonContainer>
              <FilterButton>Interesting</FilterButton>
              <FilterButton>Bountied</FilterButton>
              <FilterButton>Hot</FilterButton>
              <FilterButton>Week</FilterButton>
              <FilterButton>Month</FilterButton>
            </FilterButtonContainer>
          </TopQuestionTitle>
          {/* <QuestionList>
          </QuestionList> */}
          <MainQuestions></MainQuestions>
        </TopQuestionMain>
        <RightSidebar />
      </div>
    </>
  );
};

export default MainPage;
