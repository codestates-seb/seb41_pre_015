/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import logo from '../images/small-logo.png';
import LoginHeader from '../component/login/LoginHeader';
import LeftSidebar from '../component/LeftSidebar';
import RightSidebar from '../component/RightSidebar';
import MainQuestions from '../component/MainQuesTions';
import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../component/Footer';
import SignupHeader from '../component/login/SignupHeader';
import { AutoFixOffSharp } from '@mui/icons-material';

//질문목록 제목 전체영역
const AllQuestionMain = styled.div`
  width: 100%;
  height: 200%;
  padding-right: 20px;
  .pagenation {
    display: flex;
    justify-content: center;
    align-items: center;
    .currentPage {
      background-color: #0a95ff;
    }
    button {
      margin: 5px 5px;
      border: none;
      background-color: white;
    }
  }
`;
// 질문목록 제목 타이틀 칸
const AllQuestionTitle = styled.div`
  width: 100%;
  height: 110px;
  border: 1px solid black;
  margin-bottom: 10px;
  border-width: 0.3px;
`;
//AskQuestion 버튼 전체영역
const AskQuestionContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  div {
    font-size: 30px;
  }
`;

const SLinkquestion = styled(Link)`
  width: 35%;
  height: 30px;
  background-color: #0a95ff;
  border-radius: 2px;
  border-color: #0078ff;
  margin: 10px;
  text-decoration: none;
  text-align: center;
  color: white;
  :hover {
    color: white;
    background-color: #1478ff;
  }
`;
// 필터버튼 전체영역
const FilterButtonContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin-bottom: 10px;
`;
// 필터버튼((Interesting, Bountied, Hot, Week, Month))
const FilterButton = styled.button`
  height: 30px;
  margin-right: 3px;
  border-radius: 5px;
`;

const MainPage = () => {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const MaxPage = Number(localStorage.getItem('TotalPage'));
  const PageNum = Array.from(Array(MaxPage), (_, index) => index + 1);
  // 페이지가 그려지기 전에 axios로 데이터 호출
  useEffect(() => {
    window.scrollTo(0, 0);
    const init = async () => {
      const result = await axios.get(
        // `http://ec2-3-36-57-221.ap-northeast-2.compute.amazonaws.com:8080/questions?page=1&size=10`
        `http://43.201.119.99:8080/questions/latest?page=${currentPage}&size=5`,
        {
          headers: { authorization: localStorage.getItem('accessToken') }, // headers에 headers 객체 전달
        }
      );
      localStorage.setItem('TotalPage', result.data.pageInfo.totalPages);
      setList(result.data.data);
    };
    init();
  }, [currentPage]);

  // 추천순 필터
  const like_filter = () => {
    console.log('추천순 필터');
    let temp = [...list];
    let result = temp.sort((a, b) => {
      if (a.score > b.score) return -1;
      if (a.score === b.score) return 0;
      if (a.score < b.score) return 1;
    });
    setList(result);
  };
  // 최근순 필터
  const timeline_filter = () => {
    // setList([]);
    let temp = [...list];
    let result = temp.sort((a, b) => {
      let timestamp_a = new Date(a.createdAt).getTime();
      let timestamp_b = new Date(b.createdAt).getTime();
      if (timestamp_a > timestamp_b) return -1;
      if (timestamp_a === timestamp_b) return 0;
      if (timestamp_a < timestamp_b) return 1;
    });
    setList(result);
  };
  return (
    <>
      {localStorage.getItem('accessToken') ? <LoginHeader /> : <SignupHeader />}
      <div style={{ display: 'flex' }}>
        <LeftSidebar />
        {/* 질문목록 제목 전체영역 */}
        <AllQuestionMain>
          {/* // 질문목록 제목 타이틀 칸 */}
          <AllQuestionTitle>
            <AskQuestionContainer>
              <div style={{ margin: '5px' }}>All Questions</div>
              {/* //AskQuestion 버튼과 라우터 연결(질문작성페이지 이동) */}
              <SLinkquestion to="/addquestion">Ask Question</SLinkquestion>
            </AskQuestionContainer>
            {/* 필터버튼 전체영역 */}
            <FilterButtonContainer>
              {/* 필터버튼 */}
              <FilterButton onClick={() => like_filter()}>추천순</FilterButton>
              <FilterButton onClick={() => timeline_filter()}>
                최근순
              </FilterButton>
            </FilterButtonContainer>
          </AllQuestionTitle>
          {/* // 질문목록 제목 타이틀 칸 끝*/}
          {/* <라우터 연결> */}
          {list.length > 0 ? (
            <MainQuestions _list={list}></MainQuestions>
          ) : null}
          <div className="pagenation">
            <button
              onClick={() => {
                if (currentPage === 1) return;
                setCurrentPage(currentPage - 1);
              }}
            >
              ⬅️
            </button>
            {PageNum.map((el) => (
              <button
                key={el}
                value={el}
                className={el === currentPage ? 'currentPage' : ''}
                onClick={() => {
                  setCurrentPage(el);
                }}
              >
                {el}
              </button>
            ))}
            <button
              onClick={() => {
                if (currentPage === MaxPage) {
                  setCurrentPage(MaxPage);
                } else {
                  setCurrentPage(currentPage + 1);
                }
              }}
            >
              ➡️
            </button>
          </div>
        </AllQuestionMain>
        {/* //질문목록 제목 전체영역 끝 */}
        <RightSidebar />
      </div>
      <Footer />
    </>
  );
};

export default MainPage;
