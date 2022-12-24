<<<<<<< HEAD
// import React from 'react'
import styled from 'styled-components';

=======
import styled from 'styled-components';
>>>>>>> d453e27082a089ed9b5c0bfae3306b3259e698e3
import MypageMain from '../component/Mypage/MypageMain';
import MypageTitle from '../component/Mypage/MypageTitle';
import MypageStats from '../component/Mypage/MypageStats';

const MyPage = () => {
  return (
    <MypageContainer>
      <div className="MypageContainer">
        <MypageTitle />
        <HorizonLine />
        <div style={{ display: 'flex' }} className="MypagebottomContainer">
          {<MypageStats />}
          {<MypageMain />}
        </div>
      </div>
    </MypageContainer>
  );
};

const HorizonLine = () => {
  return (
    <div
      style={{
        width: '100%',
        textAlign: 'center',
        borderBottom: '1px solid #aaa',
        lineHeight: '0.1em',
        margin: '10px 0 20px',
      }}
    ></div>
  );
};

export default MyPage;

const MypageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
<<<<<<< HEAD
  margin: 40px 0px 0px 50px;
=======
  margin: 40px 0px 0px 20px;
>>>>>>> d453e27082a089ed9b5c0bfae3306b3259e698e3

  .MypagebottomContainer {
    margin-top: 40px;
  }
`;
