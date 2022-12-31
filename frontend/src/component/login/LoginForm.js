import styled from 'styled-components';
import slogo from '../../images/small-logo.png';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import { AiFillFacebook } from 'react-icons/ai';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useStore from '../../store';

const SbackGround = styled.div`
  background-color: #f1f2f3;
  height: 100vh;
  display: flex;
  justify-content: center;
  img {
    margin-bottom: 20px;
  }
  .Login-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 80%;
    flex-grow: 1;
    text-align: left;
    .LoginInputForm {
      margin-top: 20px;
      background-color: white;
      flex-grow: 0.7;
      display: flex;
      flex-direction: column;
      width: 20%;
      justify-content: center;
      padding: 0 30px;
      border-radius: 5px;
      .InputBox {
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        .Email-input {
          border-radius: 5px;
          border: 2px solid #b4e5ff;
          line-height: 25px;
          outline: none;
        }
        .Password-input {
          border-radius: 5px;
          border: 2px solid #b4e5ff;
          line-height: 25px;
          outline: none;
        }
      }
    }
    .help-comment {
      margin-top: 30px;
      font-size: small;
    }
    .Login-button {
      background-color: #0a95ff;
      line-height: 30px;
      border-color: #5ad2ff;
      color: white;
      border-radius: 5px;
      cursor: pointer;
    }
  }
`;

const SAauthLogin = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  padding: 10.4px 0;
  margin: 4px 0;
  border-radius: 5px;
`;
const SGoogleLogin = styled(SAauthLogin)`
  background-color: white;
`;
const SGithubLogin = styled(SAauthLogin)`
  background-color: #2f3337;
  color: white;
`;
const SFacebookLogin = styled(SAauthLogin)`
  background-color: #385499;
  color: white;
`;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUserdata } = useStore();
  const navigate = useNavigate();

  const OnSubmitLogin = async (e) => {
    e.preventDefault();
    await axios
      .post(
        'http://ec2-3-36-57-221.ap-northeast-2.compute.amazonaws.com:8080/auth/login',
        {
          email: email,
          password: password,
        }
      )
      .then((res) => {
        setEmail('');
        setPassword('');
        localStorage.setItem('accessToken', res.headers.authorization);
        setUserdata(res.data);
        localStorage.setItem('UserId', res.data.id);
        localStorage.setItem('Useremail', res.data.email);
        alert('로그인 성공');
        navigate('/main');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <SbackGround>
        <div className="Login-item">
          <img src={slogo} alt="small-logo"></img>
          <SGoogleLogin>
            <FcGoogle size="20" /> &nbsp;&nbsp;Log in with Google
          </SGoogleLogin>
          <SGithubLogin>
            <BsGithub size="20" /> &nbsp;&nbsp;Log in with Github
          </SGithubLogin>
          <SFacebookLogin>
            <AiFillFacebook size="20" />
            &nbsp;&nbsp;Log in with Facebook
          </SFacebookLogin>
          <form className="LoginInputForm">
            <div className="InputBox">
              <div>Email</div>
              <input
                className="Email-input"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
            </div>
            <div className="InputBox">
              <div>Password</div>
              <input
                className="Password-input"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>
            </div>
            <button
              className="Login-button"
              type="submit"
              onClick={OnSubmitLogin}
            >
              Log in
            </button>
          </form>
          <div className="help-comment">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </SbackGround>
    </div>
  );
};

export default LoginForm;
