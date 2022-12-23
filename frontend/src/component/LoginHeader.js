import logo from '../images/logo-stackoverflow.png';
import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';

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

  /* display: flex;
  flex-direction: row;
  max-width: 100%;
  align-items: center;
  justify-content: center;
  width: 100%; */
`;

const SmypageButton = styled.button`
  background-color: gray;
  margin: 0 10px;
  cursor: pointer;
  padding: 10px 3px;
  color: white;
  font-weight: 550;
  border-radius: 5px;
  border-color: gray;
  border-width: 1px;
`;
const SLogoutButton = styled.button`
  background-color: #0a95ff;
  padding: 10px 3px;
  cursor: pointer;
  color: white;
  font-weight: 550;
  border-radius: 5px;
  border-color: #0078ff;
  border-width: 1px;
`;

const LoginHeader = () => {
  return (
    <Sheader className="header-container">
      <SLogo src={logo} alt="logo" />
      <Sform>
        <BsSearch></BsSearch>
        <Sinput placeholder="search"></Sinput>
      </Sform>
      <SmypageButton>My page</SmypageButton>
      <SLogoutButton>Log out</SLogoutButton>
    </Sheader>
  );
};

export default LoginHeader;
