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
`;

const SSignupContainer = styled.div`
  display: flex;
  height: 80%;
  width: 50%;
`;
const SExplainOption = styled.div`
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
`;
const SSignupItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  width: 10%;
`;
const SSignupInputForm = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 65%;
  border-radius: 5px;
  height: 70%;
  padding: 27px;
  margin-top: 20px;
`;
const SSignupButton = styled.button`
  background-color: #0a95ff;
  line-height: 30px;
  border-color: #5ad2ff;
  color: white;
  border-radius: 5px;
  margin-top: 50px;
`;
const SSignupInput = styled.input`
  line-height: 20px;
  padding: 8px;
  margin: 5px 0 10px 0;
  border-radius: 5px;
  border: 1px solid #d2d2d2;
  outline-color: #3ca0ff;
`;
const SPwInput = styled.input`
  line-height: 20px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #d2d2d2;
  outline-color: #3ca0ff;
  margin: 5px 0 5px 0;
`;
const SPwrole = styled.div`
  color: #b4b4b4;
  font-size: 12px;
`;

const SignupPage = () => {
  return (
    <div>
      <SignupHeader />
      <SbackGround>
        <SSignupContainer>
          <SExplainOption>
            <h1>Join the Stack Overflow community</h1>
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
          </SExplainOption>
          <SSignupItem>
            <SignupOauthForm></SignupOauthForm>
            <SSignupInputForm>
              <div>Display name</div>
              <SSignupInput></SSignupInput>
              <div>Email</div>
              <SSignupInput></SSignupInput>
              <div>Password</div>
              <SPwInput type="password"></SPwInput>
              <SPwrole>
                Passwords must contain at least eight characters, including at
                least 1 letter and 1 number.
              </SPwrole>
              <SSignupButton type="submit">Sign up</SSignupButton>
            </SSignupInputForm>
          </SSignupItem>
        </SSignupContainer>
      </SbackGround>
    </div>
  );
};

export default SignupPage;
