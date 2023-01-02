import logo from '../../images/logo-stackoverflow.png';
import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../../store';
import axios from 'axios';

const SLogo = styled.img`
  width: 150px;
  height: 30px;
  margin-right: 10px;
`;
const Sform = styled.div`
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
  const { SearchValue } = useStore();
  const navigate = useNavigate();
  const OnSubmitLogout = async () => {
    await axios
      .post('http://43.201.119.99:8080/auth/logout', ' ', {
        headers: {
          authorization: localStorage.getItem('accessToken'),
          refresh: localStorage.getItem('refreshToken'),
        }, // headers에 headers 객체 전달
      })
      .then((res) => {
        console.log(res.data);
        window.localStorage.clear();
        navigate('/', { replace: true });
      });
  };
  return (
    <Sheader className="header-container">
      <Link to="/main">
        <SLogo src={logo} alt="logo" />
      </Link>
      <Sform>
        <BsSearch></BsSearch>
        <Sinput
          placeholder="search"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              SearchValue(e.target.value);
            }
          }}
        ></Sinput>
      </Sform>
      <Link to="/mypage">
        <SmypageButton>My page</SmypageButton>
      </Link>
      <SLogoutButton onClick={OnSubmitLogout}>Log out</SLogoutButton>
    </Sheader>
  );
};

export default LoginHeader;
