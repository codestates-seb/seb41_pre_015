/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import logo from '../images/small-logo.png';
import LeftSidebar from './LeftSidebar';
import { Link } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

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
  // 페이지가 그려지기 전에 axios로 데이터 호출
  useEffect(() => {
    const init = async () => {
      const result = await axios.get(
        // `http://ec2-3-36-57-221.ap-northeast-2.compute.amazonaws.com:8080/questions?page=1&size=10`
        `/questions?page=1&size=10`
      );
      console.log('결과값 : ', result);
      setList(result.data.data);
    };
    init();
  }, []);
  const [list, setList] = useState([]);
  return (
    <>
      {/* 리스트 중복 */}
      {list.map((item, index) => {
        return (
          <Fragment key={index}>
            <Link
              to="/questions"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <QuestionList>
                <QuestionContentLeft>
                  <div>
                    <div style={{ margin: '5px' }}>0 votes</div>
                    <div style={{ margin: '5px' }}>0 answers</div>
                    <div style={{ margin: '5px' }}>0 views</div>
                  </div>
                </QuestionContentLeft>
                <QuestionContentMiddle>
                  <div style={{ padding: '25px' }}>{item.content}</div>
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
            </Link>
          </Fragment>
        );
      })}
    </>
  );
};

export default MainQuestions;
