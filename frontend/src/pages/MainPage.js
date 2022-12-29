/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import logo from '../images/small-logo.png';
import LoginHeader from '../component/login/LoginHeader';
import LeftSidebar from '../component/LeftSidebar';
import RightSidebar from '../component/RightSidebar';
import MainQuestions from '../component/MainQuesTions';
// import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../component/Footer';

const TopQuestionMain = styled.div`
  width: 100%;
  height: 200%;
  padding-right: 20px;
`;
const TopQuestionTitle = styled.div`
  width: 100%;
  height: 110px;
  border: 1px solid black;
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

// const AskQuestion = styled.button`
//   /* width: 140px; */
//   width: 35%;
//   height: 30px;
//   background-color: #0a95ff;
//   border-radius: 2px;
//   border-color: #0078ff;
//   margin: 10px;
// `;
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
              <SLinkquestion to="/addquestion">Ask Question</SLinkquestion>
            </AskQuestionContainer>
            <FilterButtonContainer>
              <FilterButton>Interesting</FilterButton>
              <FilterButton>Bountied</FilterButton>
              <FilterButton>Hot</FilterButton>
              <FilterButton>Week</FilterButton>
              <FilterButton>Month</FilterButton>
            </FilterButtonContainer>
          </TopQuestionTitle>
          <MainQuestions></MainQuestions>
        </TopQuestionMain>
        <RightSidebar />
      </div>
      <Footer />
    </>
  );
};

export default MainPage;
