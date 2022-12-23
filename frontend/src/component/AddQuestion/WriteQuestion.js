import styled from 'styled-components';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const SWriteContainer = styled.div`
  .Help-container {
    text-align: left;
    margin-top: 50px;
    div {
      margin-bottom: 10px;
    }
  }
  form {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    width: 700px;
    text-align: left;
    /* .question-textarea {
      resize: none;
      height: 200px;
    } */
    .title-input {
      display: flex;
      flex-direction: column;
      background-color: white;
      border: 1px solid #949090;
      padding: 10px;
      border-radius: 5px;
      div {
        color: #7c7a7a;
      }
    }
    .question-input {
      display: flex;
      flex-direction: column;
      margin: 10px 0;
      background-color: white;
      border: 1px solid #949090;
      padding: 10px;
      border-radius: 5px;
      div {
        color: #7c7a7a;
      }
    }
    .button-container {
      margin-bottom: 20px;
      .submit-button {
        background-color: #0a95ff;
        color: white;
        border: 0;
        line-height: 30px;
        margin-right: 20px;
        border-radius: 5px;
      }
      .cancel-button {
        background-color: #e16a93;
        border-radius: 5px;
        color: white;
        border: 0;
        line-height: 30px;
      }
    }
  }
`;

const WriteQuestion = () => {
  return (
    <SWriteContainer>
      <div className="Help-container">
        <div>좋은 질문 하는 방법 1: 질문 하기 전에 먼저 검색 하자!</div>
        <div>좋은 질문 하는 방법 2: 내 문제를 설명 하는 키워드를 찾자!</div>
        <div>좋은 질문 하는 방법 3: 일단 질문 하세요. JUST ASK!</div>
        <div>좋은 질문 하는 방법 4: 질문에 좋은 제목을 달자!</div>
      </div>
      <form className="Input-container">
        <div className="title-input">
          <h4>제목</h4>
          <div>
            Be specific and imagine you’re asking a question to another person.
          </div>
          <input></input>
        </div>
        <div className="question-input">
          <h4>무엇이 문제인지 자세하게 설명해주세요.</h4>
          <div>
            Describe what you tried, what you expected to happen, and what
            actually resulted. Minimum 20 characters.
          </div>
          <SunEditor height="250" />
          <h4>태그</h4>
          <div>
            Add up to 5 tags to describe what your question is about. Start
            typing to see suggestions.
          </div>
          <input></input>
        </div>
        <div className="button-container">
          <button className="submit-button">질문하기</button>
          <button className="cancel-button">취소하기</button>
        </div>
      </form>
    </SWriteContainer>
  );
};

export default WriteQuestion;
