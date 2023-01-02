import SignupHeader from '../component/login/SignupHeader';
import styled from 'styled-components';
import SignupOauthForm from '../component/signup/SignupOauthForm';
import { ImPriceTags } from 'react-icons/im';
import { MdThumbsUpDown } from 'react-icons/md';
import { RiQuestionnaireFill } from 'react-icons/ri';
import { BsTrophyFill } from 'react-icons/bs';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SbackGround = styled.div`
  background-color: #f1f2f3;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .Signup-Container {
    display: flex;
    height: 80%;
    width: 50%;
  }
  .Explain-Option {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 20%;
    flex-grow: 1;
    text-align: left;
    div {
      display: flex;
      margin-bottom: 20px;
      align-items: center;
      justify-content: left;
    }
  }
  .SignupItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    width: 10%;
  }
  .SignupInputForm {
    background-color: white;
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 80%;
    border-radius: 5px;
    height: 80%;
    padding: 27px;
    margin-top: 20px;
    .IdInput {
      line-height: 20px;
      padding: 8px;
      margin: 5px 0 10px 0;
      border-radius: 5px;
      border: 1px solid #d2d2d2;
      outline-color: #3ca0ff;
    }
    .PasswordInput {
      line-height: 20px;
      padding: 8px;
      border-radius: 5px;
      border: 1px solid #d2d2d2;
      outline-color: #3ca0ff;
      margin: 5px 0 5px 0;
    }
    .PasswordRule {
      color: #b4b4b4;
      font-size: 12px;
    }
    .SignupButton {
      background-color: #0a95ff;
      line-height: 30px;
      border-color: #5ad2ff;
      color: white;
      border-radius: 5px;
      margin-top: 50px;
    }
    .Disabled-SignupButton {
      background-color: #646464;
      line-height: 30px;
      border-color: #505050;
      color: white;
      border-radius: 5px;
      margin-top: 50px;
    }
    .Valid-comment {
      color: red;
      font-size: 12px;
    }
  }
`;

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const navigate = useNavigate();

  const isEmail = (e) => {
    const regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    // 형식에 맞는 경우 true 리턴
    if (regExp.test(e)) {
      setCheckEmail(true);
      return true;
    } else if (e.length === 0) {
      setCheckEmail(false);
      return true;
    } else {
      setCheckEmail(false);
      return false;
    }
  };
  const isPassword = (p) => {
    const regPassword =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g;

    if (regPassword.test(p)) return true;
  };

  const OnSignupSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post('http://43.201.119.99:8080/members', {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.status === 201) {
          Swal.fire({ title: '회원 가입 성공', icon: 'success' });
        }
        setName('');
        setEmail('');
        setPassword('');
        setCheckEmail(false);
        setPasswordValid(false);
        navigate('/', { replace: true });
      })
      .catch((e) => {
        if (e.response.data.status === 409) {
          Swal.fire({
            title: '이미 가입된 이메일 입니다.',
            icon: 'error',
          });
        }
        console.log(e);
      });
  };
  return (
    <div>
      <SignupHeader />
      <SbackGround>
        <div className="Signup-Container">
          <div className="Explain-Option">
            <h2>Join the Stack Overflow community</h2>
            <div>
              <RiQuestionnaireFill size="20" color="#0a95ff" /> &nbsp;&nbsp;Get
              unstuck — ask a question
            </div>
            <div>
              <MdThumbsUpDown size="20" color="#0a95ff" /> &nbsp;&nbsp;Unlock
              new privileges like voting and commenting
            </div>
            <div>
              <ImPriceTags size="20" color="#0a95ff" /> &nbsp;&nbsp;Save your
              favorite tags, filters, and jobs
            </div>
            <div>
              <BsTrophyFill size="20" color="#0a95ff" /> &nbsp;&nbsp;Earn
              reputation
            </div>
          </div>
          <div className="SignupItem">
            <SignupOauthForm></SignupOauthForm>
            <form className="SignupInputForm">
              <div>Display name</div>
              <input
                className="IdInput"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>
              <div>Email</div>
              <input
                className="IdInput"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailValid(isEmail(e.target.value));
                }}
              ></input>
              {emailValid ? (
                ''
              ) : (
                <div className="Valid-comment">
                  유효하지 않은 이메일 입니다.
                </div>
              )}
              {checkEmail ? '✅' : ''}
              <div>Password</div>
              <input
                className="PasswordInput"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordValid(isPassword(e.target.value));
                }}
              ></input>
              {passwordValid ? (
                '✅'
              ) : (
                <div className="PasswordRule">
                  Passwords must contain at least eight characters, including at
                  least 1 letter and 1 number.
                </div>
              )}
              {passwordValid && emailValid ? (
                <button
                  className="SignupButton"
                  type="submit"
                  onClick={OnSignupSubmit}
                >
                  Sign up
                </button>
              ) : (
                <button
                  className="Disabled-SignupButton"
                  type="submit"
                  onClick={OnSignupSubmit}
                  disabled
                >
                  Sign up
                </button>
              )}
            </form>
          </div>
        </div>
      </SbackGround>
    </div>
  );
};

export default SignupPage;
