import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { TagsInput } from 'react-tag-input-component';
import useStore from '../../store';
import Swal from 'sweetalert2';

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
    textarea {
      resize: none;
      height: 200px;
    }
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
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selected, setSelected] = useState([]);
  const { Userdata } = useStore();

  const navigate = useNavigate();

  const onSubmitQuestion = async (e) => {
    e.preventDefault();
    await axios
      .post(
        'http://43.201.119.99:8080/questions',
        {
          memberId: Userdata.id,
          title: title,
          content: content,
        },
        {
          headers: { authorization: localStorage.getItem('accessToken') }, // headers에 headers 객체 전달
        }
      )
      .then(() => {
        Swal.fire({
          text: '질문 등록 완료!',
          icon: 'success',
        });
        setTitle(null);
        setContent(null);
        navigate('/main');
      })
      .catch((e) => {
        console.log(e);
      });
  };
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
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
        </div>
        <div className="question-input">
          <h4>무엇이 문제인지 자세하게 설명해주세요.</h4>
          <div>
            Describe what you tried, what you expected to happen, and what
            actually resulted. Minimum 20 characters.
          </div>
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <h4>태그</h4>
          <div>
            Add up to 5 tags to describe what your question is about. Start
            typing to see suggestions.
          </div>
          <TagsInput
            type="text"
            id="message"
            name="message"
            onChange={setSelected}
            value={selected}
            placeholder="태그를 입력해 주세요"
          />
        </div>
        <div className="button-container">
          <button className="submit-button" onClick={onSubmitQuestion}>
            질문하기
          </button>
          <Link to="/main">
            <button className="cancel-button">취소하기</button>
          </Link>
        </div>
      </form>
    </SWriteContainer>
  );
};

export default WriteQuestion;
