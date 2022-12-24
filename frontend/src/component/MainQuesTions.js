/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import logo from '../images/small-logo.png';
import LoginHeader from './LoginHeader';
import LeftSidebar from './LeftSidebar';

const QuestionList = styled.div`
  width: 600px;
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

const MainQuestions = () => {
  return (
    <>
      <QuestionList>
        <QuestionContentLeft>
          <div>
            <h3>0 votes</h3>
            <h3>0 answers</h3>
            <h3>2 views</h3>
          </div>
        </QuestionContentLeft>
        <QuestionContentMiddle>
          <h4>IActionResult not returning string response as string</h4>
          <TagContainer>
            <Tag>node.js</Tag>
            <Tag>react.js</Tag>
            <Tag>C ++</Tag>
          </TagContainer>
        </QuestionContentMiddle>
        <QuestionImg>
          <ProfileImg src={logo} alt="logo"></ProfileImg>
          <div>User name</div>
        </QuestionImg>
      </QuestionList>
    </>
  );
};

export default MainQuestions;
