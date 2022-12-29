// import React from 'react'
import styled from 'styled-components';

import MypageMain from '../component/Mypage/MypageMain';
import MypageTitle from '../component/Mypage/MypageTitle';
import MypageStats from '../component/Mypage/MypageStats';
import Footer from '../component/Footer';
import Header from '../component/login/LoginHeader';
import LeftSidebar from '../component/LeftSidebar';

const MyPage = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div style={{ display: 'flex' }}>
        {<LeftSidebar />}
        {
          <MypageContainer>
            <div className="MypageContainer">
              <MypageTitle />
              <HorizonLine />
              <div
                style={{ display: 'flex' }}
                className="MypagebottomContainer"
              >
                {<MypageStats />}
                {<MypageMain />}
              </div>
            </div>
          </MypageContainer>
        }
      </div>
      <Footer />
    </div>
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
        margin: '10px 0 100px',
      }}
    ></div>
  );
};

export default MyPage;

const MypageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 40px 0px 0px 50px;

  .MypagebottomContainer {
    margin-top: 40px;
  }
`;
