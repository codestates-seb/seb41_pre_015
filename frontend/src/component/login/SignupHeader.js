import logo from '../../images/logo-stackoverflow.png';
import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const SLogo = styled.img`
  width: 150px;
  height: 30px;
  margin-right: 10px;
`;
const Sform = styled.form`
  display: flex;
  margin: 0 10px 0 0;
  flex-grow: 0.8;
  padding: 5px;
  border: solid;
  border-color: gray;
  justify-items: center;
  align-items: center;
  border-radius: 5px;
`;

const Sinput = styled.input`
  flex-grow: 1;
  margin: 0;
  padding: 5px 5px;
  border: none;
  outline: none;
`;

const Sheader = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 100%;
  align-items: center;
  justify-content: center;
  margin: 10px 20px;
  height: 100%;
`;

const SLoginButton = styled.button`
  background-color: #e1ecf4;
  margin: 0 10px;
  cursor: pointer;
  padding: 10px 3px;
  color: white;
  font-weight: 550;
  border-radius: 5px;
  color: #39739d;
  border-color: #39739d;
  border-width: 1px;
`;
// const SLogoutButton = styled.button`
//   background-color: #0a95ff;
//   padding: 10px 3px;
//   cursor: pointer;
//   color: white;
//   font-weight: 550;
//   border-radius: 5px;
//   border-color: #0078ff;
//   border-width: 1px;
// `;
const SLink = styled(Link)`
  background-color: #0a95ff;
  padding: 10px 3px;
  cursor: pointer;
  color: white;
  font-weight: 550;
  border-radius: 5px;
  border-color: #0078ff;
  border-width: 1px;
  text-decoration: none;
`;

const SignupHeader = () => {
  return (
    <Sheader className="header-container">
      <SLogo src={logo} alt="logo" />
      <Sform>
        <BsSearch></BsSearch>
        <Sinput placeholder="search"></Sinput>
      </Sform>
      <SLoginButton>Log in</SLoginButton>
      <SLink to="/signup">Sign up</SLink>
    </Sheader>
  );
};

export default SignupHeader;
