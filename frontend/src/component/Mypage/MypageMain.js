// import React from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
// import { useState } from 'react';

// const [abouts, setAbouts] = useState([]);

const MypageMain = () => {
  return (
    <MypageMainContainer>
      <div className="mypage_main">
        <div className="user_about">
          <h2>About</h2>
          <div className="user_about_box">
            {/* {abouts === '' ? ( */}
            <div>
              {`Your about me section is currently blank. Would you like to
                  add one? `}
              <Link to="/editmypage">
                <h6>Edit profile</h6>
              </Link>
            </div>
            {/* ) : (
              setAbouts
            )} */}
          </div>
        </div>
        <div style={{ display: 'flex' }} className="ans_que_group">
          <div>
            <div style={{ display: 'flex' }} className="user_answer_group">
              <h3 className="ans">Answer</h3>
              <BasicExample />
            </div>
            <div className="user_answer_box">
              You have not answered any questions.
            </div>
          </div>
          <div>
            <div style={{ display: 'flex' }} className="user_question_group">
              <h3 className="que">Question</h3>
              <BasicExample />
            </div>
            <div className="user_question_box">
              You have not asked any questions.
            </div>
          </div>
        </div>
        <div className="user_bookmark">
          <div>
            <h2>Bookmark</h2>
            <h5>1 saved items </h5>
            <HorizonLine />
            <div className="user_bookmark_box">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'baseline',
                  marginBottom: '30px',
                }}
              >
                <h6 style={{ fontWeight: 'bold' }}>3 Votes</h6>
                <AnswerBadge />
                <h6>83 views</h6>
                <AnswerBadge2 />
                <div style={{ width: '400px' }}> </div>
              </div>
              <h5 style={{ color: 'blue' }}>
                How to custom cursor image that has white transparent
                background?
              </h5>
            </div>
          </div>
        </div>
      </div>
    </MypageMainContainer>
  );
};

function BasicExample() {
  return (
    <ButtonGroup aria-label="Basic example" size="sm">
      <Button variant="warning" className="b1">
        Score
      </Button>
      <Button variant="warning" className="b2">
        Activity
      </Button>
      <Button variant="warning" className="b3">
        Newest
      </Button>
    </ButtonGroup>
  );
}

function AnswerBadge() {
  return (
    <div>
      <Badge bg="light" text="dark">
        2 Answer
      </Badge>{' '}
    </div>
  );
}

function AnswerBadge2() {
  return (
    <div>
      <Badge bg="primary" text="white">
        + 100
      </Badge>{' '}
    </div>
  );
}

const HorizonLine = () => {
  return (
    <div
      style={{
        width: '100%',
        textAlign: 'center',
        borderBottom: '1px solid #aaa',
        lineHeight: '0.1em',
        margin: '10px 0 20px',
      }}
    ></div>
  );
};

export default MypageMain;

const MypageMainContainer = styled.div`
  display: flex;

  .mypage_main {
    .user_about {
      margin-left: 50px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      display: inline-block;
    }

    .ans_que_group {
      margin: 20px 0px 0px 50px;
    }

    .user_about_box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border: 1px solid gray;
      border-radius: 10px;
      width: 700px;
      height: 200px;
    }

    .styledButton {
      display: inline-flex;
      outline: none;
      border: none;
      border-radius: 4px;
      color: white;
      font-weight: bold;
      cursor: pointer;
      justify-content: center;
      align-items: center;
      margin-top: 30px;

      /* 크기 */
      width: 200px;
      height: 50px;
      font-size: 1rem;

      /* 색상 */
      background: lightgray;
      &:hover {
        background: lightblue;
      }
    }
    .user_question_box,
    .user_answer_box {
      display: flex;
      flex-direction: column;
      background-color: aliceblue;
      width: 350px;
      height: 150px;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .user_question_group,
    .user_answer_group {
      margin-top: 40px;
      margin-bottom: 10px;
    }

    .user_question_box,
    .user_question_group {
      margin-left: 20px;
    }

    .ans {
      margin-right: 20px;
    }
    .b1 {
      margin-left: 50px;
    }

    .user_bookmark {
      margin: 40px 0px 0px 50px;
    }

    .user_bookmark_box {
      border: 1px solid gray;
      border-radius: 10px;
      width: 750px;
      height: 200px;
      padding: 30px 0px 20px 30px;
      margin-bottom: 100px;
    }
  }
`;
