/* eslint-disable import/namespace */
// import React from 'react';
import styled from 'styled-components';

import MypageTitle from '../component/Mypage/MypageTitle';
import MypageStats from '../component/Mypage/MypageStats';
import MypageEditList from '../component/Mypage/MypageEditList';
import Footer from '../component/Footer';
import Header from '../component/LoginHeader';
import LeftSidebar from '../component/LeftSidebar';

const MypageEdit = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div style={{ display: 'flex' }}>
        {<LeftSidebar />}
        {
          <MypageEditContainer>
            <div className="MypageContainer">
              <MypageTitle />
              <HorizonLine />
              <div
                style={{ display: 'flex' }}
                className="MypagebottomContainer"
              >
                {<MypageStats />}
                {<MypageEditList />}
              </div>
            </div>
          </MypageEditContainer>
        }
      </div>
      <div>
        <Footer />
      </div>
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
        margin: '10px 0 20px',
      }}
    ></div>
  );
};

export default MypageEdit;

const MypageEditContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 40px 0px 0px 50px;

  .MypagebottomContainer {
    margin: 40px 0px 100px 0px;
  }
`;
