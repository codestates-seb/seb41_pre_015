import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import { AiFillFacebook } from 'react-icons/ai';

const SAauthLogin = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10.4px 0;
  margin: 4px 0;
  border-radius: 5px;
  height: 40px;
  width: 80%;
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

const SignupForm = () => {
  return (
    <>
      <SGoogleLogin>
        <FcGoogle size="20" /> &nbsp;&nbsp;Sign up with Google
      </SGoogleLogin>
      <SGithubLogin>
        <BsGithub size="20" /> &nbsp;&nbsp;Sign up with Github
      </SGithubLogin>
      <SFacebookLogin>
        <AiFillFacebook size="20" />
        &nbsp;&nbsp;Sign up with Facebook
      </SFacebookLogin>
    </>
  );
};

export default SignupForm;
