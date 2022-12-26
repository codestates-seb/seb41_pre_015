import SignupHeader from '../component/login/SignupHeader';
import styled from 'styled-components';
import SignupOauthForm from '../component/signup/SignupOauthForm';
import { ImPriceTags } from 'react-icons/im';
import { MdThumbsUpDown } from 'react-icons/md';
import { RiQuestionnaireFill } from 'react-icons/ri';
import { BsTrophyFill } from 'react-icons/bs';

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
  }
`;

const SignupPage = () => {
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
              <input className="IdInput"></input>
              <div>Email</div>
              <input className="IdInput"></input>
              <div>Password</div>
              <input className="PasswordInput" type="password"></input>
              <div className="PasswordRule">
                Passwords must contain at least eight characters, including at
                least 1 letter and 1 number.
              </div>
              <button className="SignupButton" type="submit">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </SbackGround>
    </div>
  );
};

export default SignupPage;
