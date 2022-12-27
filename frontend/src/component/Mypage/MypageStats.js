// import React from 'react'
import styled from 'styled-components';

const MypageStats = () => {
  return (
    <MypagestatsContainer>
      <div className="title">Stats</div>
      <div className="StatContainer">
        <div className="StatTop">
          <StatDiv>
            <StatNum>1</StatNum>
            <StatMsg>reputation</StatMsg>
          </StatDiv>

          <StatDiv>
            <StatNum>0</StatNum>
            <StatMsg>reached</StatMsg>
          </StatDiv>
        </div>

        <div className="StatBottom">
          <StatDiv>
            <StatNum>1</StatNum>
            <StatMsg>answers</StatMsg>
          </StatDiv>

          <StatDiv>
            <StatNum>0</StatNum>
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
