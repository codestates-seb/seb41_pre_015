/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import logo from '../images/small-logo.png';
import LeftSidebar from './LeftSidebar';
import { Link } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import useStore from '../store';
import { SettingsCellSharp } from '@mui/icons-material';

const QuestionList = styled.div`
  /* width: 600px; */
  width: 100%;
  height: 130px;
  border: 1px solid black;
  display: flex;
  margin-left: 10px;
`;

// 질문정보(votes,answers,views)
const QuestionContentLeft = styled.div`
  width: 20%;
  height: 131.9px;
  /* background-color: pink; */
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  font-size: 15px;
`;

// 특정질문 내용
const QuestionContentMiddle = styled.div`
  text-align: center;
  font-size: 15px;
  /* background-color: red; */
  width: 340px;
`;
// 질문 태그 전체영역
const TagContainer = styled.div`
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
// 질문태그
const Tag = styled.button`
  width: 100%;
  height: 30px;
  background-color: #d0e2f0;
  margin-left: 10px;
  border-radius: 5px;
  border-color: #d0e2f0;
`;
// 질문작성자 정보(회원이름,프로필이미지)
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

// eslint-disable-next-line react/prop-types
const MainQuestions = ({ _list }) => {
  const [list, setList] = useState([]);
  // // 페이지가 그려지기 전에 axios로 데이터 호출
  // useEffect(() => {
  //   const init = async () => {
  //     const result = await axios.get(
  //       // `http://ec2-3-36-57-221.ap-northeast-2.compute.amazonaws.com:8080/questions?page=1&size=10`
  //       `/questions?page=1&size=10`
  //     );
  //     console.log('결과값 : ', result);
  //     setList(result.data.data);
  //   };
  //   init();
  // }, []);

  // 글자수 자르기
  const textLengthOverCut = (txt, len, lastTxt) => {
    if (len == '' || len == null) {
      // 기본값
      len = 45;
    }
    if (lastTxt == '' || lastTxt == null) {
      // 기본값
      lastTxt = '...';
    }
    if (txt.length > len) {
      txt = txt.substr(0, len) + lastTxt;
    }
    return txt;
  };

  useEffect(() => {
    setList(_list);
  }, [_list]);

  return (
    <>
      {/* 리스트 중복 */}
      {list.map((item, index) => {
        return (
          <Fragment key={index}>
            <Link
              to={`/questions/${item.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
              state={{ data: item, questionId: item.id }}
            >
              <QuestionList>
                {/* 질문 정보 (votes투표수,answers답변수,views 질문열람 수) */}
                <QuestionContentLeft>
                  <div>
                    <div style={{ margin: '5px' }}>{item.score} votes</div>
                    <div style={{ margin: '5px' }}>
                      {item.answer.length} answers
                    </div>
                  </div>
                </QuestionContentLeft>

                {/* 특정질문 내용 */}
                <QuestionContentMiddle>
                  <div style={{ padding: '25px' }}>
                    {textLengthOverCut(item.title)}
                  </div>
                  {/* 질문 태그 */}
                  <TagContainer>
                    <Tag>Tag</Tag>
                    <Tag>Tag</Tag>
                    <Tag>Tag</Tag>
                  </TagContainer>
                </QuestionContentMiddle>
                {/* 특정질문 내용 끝*/}

                {/* 질문작성자 정보(프로필,이름) */}
                <QuestionImg>
                  <ProfileImg src={logo} alt="logo"></ProfileImg>
                  <div style={{ margin: '10px' }}>{item.memberName}</div>
                </QuestionImg>
              </QuestionList>
              {/* 질문조회 전체영역 끝*/}
            </Link>
          </Fragment>
        );
      })}
    </>
  );
};

export default MainQuestions;
