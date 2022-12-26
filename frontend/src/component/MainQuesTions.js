/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import logo from '../images/small-logo.png';
import LoginHeader from './LoginHeader';
import LeftSidebar from './LeftSidebar';

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
  /* width: 50%; */
  height: 131.9px;
  /* background-color: pink; */
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  font-size: 15px;
`;
// 내용 우측
const TagContainer = styled.div`
  height: 10px;
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
  width: 100%;
  height: 30px;
  background-color: #d0e2f0;
  margin-left: 10px;
  border-radius: 5px;
  border-color: #d0e2f0;
`;
// 작성자
const QuestionImg = styled.div`
  width: 50%;
  height: 130px;
  /* background-color: yellowgreen; */
  display: flex;
  justify-content: center;
  align-items: end;
`;

const ProfileImg = styled.img`
  /* width: 20%; */
  height: 20px;
  margin: 10px;
`;

// 우측
const SectionRight = styled.div`
  width: 30%;
  height: 100%;
`;

const MainQuestions = () => {
  return (
    <>
      {/* {리스트 1} */}
      <QuestionList>
        <QuestionContentLeft>
          <div>
            <div style={{ margin: '5px' }}>0 votes</div>
            <div style={{ margin: '5px' }}>0 answers</div>
            <div style={{ margin: '5px' }}>2 views</div>
          </div>
        </QuestionContentLeft>
        <QuestionContentMiddle>
          <div style={{ padding: '25px' }}>
            IActionResult not returning string response as string
          </div>
          <TagContainer>
            <Tag>node.js</Tag>
            <Tag>react.js</Tag>
            <Tag>C ++</Tag>
          </TagContainer>
        </QuestionContentMiddle>
        <QuestionImg>
          <ProfileImg src={logo} alt="logo"></ProfileImg>
          <div style={{ margin: '10px' }}>User name</div>
        </QuestionImg>
      </QuestionList>
      {/* {리스트 2} */}
      <QuestionList>
        <QuestionContentLeft>
          <div>
            <div style={{ margin: '5px' }}>0 votes</div>
            <div style={{ margin: '5px' }}>0 answers</div>
            <div style={{ margin: '5px' }}>2 views</div>
          </div>
        </QuestionContentLeft>
        <QuestionContentMiddle>
          <div style={{ padding: '25px' }}>
            IActionResult not returning string response as string
          </div>
          <TagContainer>
            <Tag>node.js</Tag>
            <Tag>react.js</Tag>
            <Tag>C ++</Tag>
          </TagContainer>
        </QuestionContentMiddle>
        <QuestionImg>
          <ProfileImg src={logo} alt="logo"></ProfileImg>
          <div style={{ margin: '10px' }}>User name</div>
        </QuestionImg>
      </QuestionList>
      {/* {리스트 3} */}
      <QuestionList>
        <QuestionContentLeft>
          <div>
            <div style={{ margin: '5px' }}>0 votes</div>
            <div style={{ margin: '5px' }}>0 answers</div>
            <div style={{ margin: '5px' }}>2 views</div>
          </div>
        </QuestionContentLeft>
        <QuestionContentMiddle>
          <div style={{ padding: '25px' }}>
            IActionResult not returning string response as string
          </div>
          <TagContainer>
            <Tag>Tag</Tag>
            <Tag>Tag</Tag>
            <Tag>Tag</Tag>
          </TagContainer>
        </QuestionContentMiddle>
        <QuestionImg>
          <ProfileImg src={logo} alt="logo"></ProfileImg>
          <div style={{ margin: '10px' }}>User name</div>
        </QuestionImg>
      </QuestionList>
    </>
  );
};

export default MainQuestions;
