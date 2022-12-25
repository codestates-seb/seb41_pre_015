/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import logo from '../images/small-logo.png';
import LoginHeader from '../component/LoginHeader';
import LeftSidebar from '../component/LeftSidebar';
import RightSidebar from '../component/RightSidebar';
import MainQuestions from '../component/MainQuesTions';

const TopQuestionTitle = styled.div`
  /* width: 600px; */
  width: 100%;
  height: 110px;
  border: 1px solid black;
  display: grid;
  margin-left: 10px;
  margin-bottom: 10px;
  border-width: 0.2px;
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
  width: 140px;
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
  width: 100px;
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
  height: 60px;
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
  width: 20;
  height: 20px;
  background-color: #d0e2f0;
  margin-left: 10px;
`;
// 작성자
const QuestionImg = styled.div`
  width: 150px;
  height: 130px;
  /* background-color: yellowgreen; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 20px;
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
        <div>
          <TopQuestionTitle>
            <AskQuestionContainer>
              <div style={{ margin: '10px' }}>Top Questions</div>
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
        </div>
      </div>
    </>
  );
};

export default MainPage;
