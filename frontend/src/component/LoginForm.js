import styled from 'styled-components';
import slogo from '../images/small-logo.png';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import { AiFillFacebook } from 'react-icons/ai';

const SbackGround = styled.div`
  background-color: #f1f2f3;
  height: 100vh;
  display: flex;
  justify-content: center;
`;
const SsmallLogo = styled.img`
  margin-bottom: 20px;
`;
const SLoginItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 80%;
  flex-grow: 1;
  text-align: left;
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
const SLoginInputForm = styled.div`
  margin-top: 20px;
  background-color: white;
  flex-grow: 0.7;
  display: flex;
  flex-direction: column;
  width: 16%;
  justify-content: center;
  padding: 0 30px;
  border-radius: 5px;
`;
const SEmailInputBox = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;
const SPasswordInputBox = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;
const SLoginButton = styled.button`
  background-color: #0a95ff;
  line-height: 30px;
  border-color: #5ad2ff;
  color: white;
  border-radius: 5px;
`;
const SEmailInput = styled.input`
  border-radius: 5px;
  border-color: #b4e5ff;
  line-height: 25px;
`;
const SPasswordInput = styled.input`
  border-radius: 5px;
  border-color: #b4e5ff;
  line-height: 25px;
`;
const SHelpSentence = styled.div`
  margin-top: 30px;
  font-size: small;
`;

const LoginForm = () => {
  return (
    <div>
      <SbackGround>
        <SLoginItem>
          <SsmallLogo src={slogo} alt="small-logo"></SsmallLogo>
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
          <SLoginInputForm>
            <SEmailInputBox>
              <div>Email</div>
              <SEmailInput></SEmailInput>
            </SEmailInputBox>
            <SPasswordInputBox>
              <div>Password</div>
              <SPasswordInput type="password"></SPasswordInput>
            </SPasswordInputBox>
            <SLoginButton>Log in</SLoginButton>
          </SLoginInputForm>
          <SHelpSentence>
            Don’t have an account? <a href=" ">Sign up</a>
          </SHelpSentence>
        </SLoginItem>
      </SbackGround>
    </div>
  );
};

export default LoginForm;
