// import React from 'react'
// import React from 'react';
import styled from 'styled-components';
import useStore from '../../store';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MypageStats = () => {
  const { Userdata } = useStore();
  const [answerView, setAnswerView] = useState([]);
  const [questionView, setQuestionView] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://43.201.119.99:8080/members/${Number(
          Userdata.id

        )}/questions?page=1&size=4`,

        {
          headers: { authorization: localStorage.getItem('accessToken') },
        }
      )
      .then((response) => {
        setQuestionView(response.data.data);
        console.log('questions', response);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://43.201.119.99:8080/members/${Number(
          Userdata.id
        )}/answers?page=1&size=4`,
        {
          headers: { authorization: localStorage.getItem('accessToken') },
        }
      )
      .then((response) => {
        setAnswerView(response.data.data);
        console.log('answers', response);
      });
  }, []);

  return (
    <MypagestatsContainer>
      <div className="title">Stats</div>
      <div className="StatContainer">
        <div className="StatTop">
          <StatDiv>
            <StatNum>0</StatNum>
            <StatMsg>reputation</StatMsg>
          </StatDiv>

          <StatDiv>
            <StatNum>0</StatNum>
            <StatMsg>reached</StatMsg>
          </StatDiv>
        </div>

        <div className="StatBottom">
          <StatDiv>
            <StatNum>{answerView.length}</StatNum>
            <StatMsg>answers</StatMsg>
          </StatDiv>

          <StatDiv>
            <StatNum>{questionView.length}</StatNum>
            <StatMsg>questions</StatMsg>
          </StatDiv>
        </div>
      </div>
    </MypagestatsContainer>
  );
};

export default MypageStats;

export const MypagestatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  > .title {
    font-size: 1.5em;
    padding-bottom: 0.3em;
    letter-spacing: -0.03em;
  }

  .StatContainer {
    padding: 1em;
    box-sizing: border-box;
    gap: 1em;
    border: 1px solid #d6d9dc;
    border-radius: 0.3em;
    flex-wrap: wrap;
    @media screen and (max-width: 1050px) {
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
    }
  }

  .StatTop {
    display: flex;
    flex: 1;
    gap: 3em;
    flex-shrink: 1;
    @media screen and (min-width: 981px) {
      padding-bottom: 0.5em;
    }
  }

  .StatBottom {
    display: flex;
    flex: 1;
    gap: 4em;
    flex-shrink: 1;
  }
`;

export const StatDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const StatNum = styled.p`
  font-size: 1.2em;
  padding-bottom: 0.2em;
  @media screen and (max-width: 640px) {
    font-size: 1em;
  }
`;

export const StatMsg = styled.p`
  font-size: 0.9em;
  color: #626a73;
  @media screen and (max-width: 640px) {
    font-size: 0.8em;
  }
`;
