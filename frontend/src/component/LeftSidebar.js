/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-unresolved */
// import React from 'react';
import { Public, Stars, Work, Info } from '@mui/icons-material';
import styled from 'styled-components';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const LeftSidebar = () => {
  return (
    <LeftSidebarContainer>
      <div className="sidebar">
        <div className="sidebar-container">
          <div className="sidebar-options">
            <div className="sidebar-option">
              <p className="p">Home</p>
            </div>
            <div className="sidebar-option">
              <p className="p">PUBLIC</p>
              <div className="link">
                <div className="link-tag">
                  <Public className="public" />
                  <a className="a">Questions</a>
                </div>
                <div className="link-tag">
                  <div className="a">
                    <PersonPinIcon />
                    MyPage
                  </div>
                  {/* <a
                    className="a"
                    href="https://www.codestates.com/?utm_source=naver&utm_medium=cpc&utm_campaign=%EB%B8%8C%EB%9E%9C%EB%93%9C%EA%B2%80%EC%83%89pc&utm_content=%ED%99%88%EB%A7%81%ED%81%AC&utm_term=%EC%BD%94%EB%93%9C%EC%8A%A4%ED%85%8C%EC%9D%B4%EC%B8%A0&ad_campaign=cmp-a001-04-000000004953107&ad_campaign_type=4&NaPm=ct%3Dlc07fpb4%7Cci%3D0Am0003akUjxAJnRs0Xn%7Ctr%3Dbrnd%7Chk%3D1178f1eeea53e08076562d8fe5bd436b3c0b03d7"
                  >
                    Companies
                  </a> */}
                </div>
                <div className="a">
                  <LocalOfferIcon />
                  Tags
                </div>
              </div>
            </div>
            <div className="sidebar-option">
              <p className="p">
                COLLECTIVES
                <Info className="info" />
              </p>
              <div className="link">
                <div className="link-tag">
                  <Stars className="stars" />
                  <a className="a">Explore Collectives</a>
                </div>
              </div>
            </div>
            <div className="sidebar-option">
              <p className="p">
                TEAMS
                <Info className="info" />
              </p>
              <div className="link">
                <div className="link-tag">
                  <Work className="work" />
                  <a className="a">Create free Team</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LeftSidebarContainer>
  );
};

export default LeftSidebar;

const LeftSidebarContainer = styled.div`
  width: 200px;
  padding-left: 30px;

  @media (max-width: 640px) {
    .sidebar {
      display: none;
    }
  }

  @media (min-width: 641px) and (max-width: 1264px) {
    .sidebar {
      display: flex;
      padding-left: 5px;
      height: 100%;
      flex: 0.5;
      max-width: 200px;
      border-right: 1px solid #ddd;
    }
  }

  @media (min-width: 1265px) {
    .sidebar {
      width: 200px;
    }
  }

  .sidebar-container {
    margin: 10px 0;
    display: flex;
    width: 100%;
  }

  .sidebar-options {
    display: flex;
    flex-direction: column;
    width: 200px;
  }

  .sidebar-option {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    font-size: 14px;
    /* width: 200px; */
  }

  .a {
    text-decoration: none;
    color: gray;
    &hover {
      color: #000;
    }
  }

  .sidebar-option > p {
    color: gray;
    font-size: 14px;
  }

  .link {
    display: flex;
    flex-direction: column;
  }

  .link-tag {
    display: flex;
    align-items: center;
    padding: 5px 0;
    width: 100%;
    box-sizing: border-box;
  }

  .link-tag:hover {
    border-right: 3px solid rgba(245, 162, 9);
    background-color: rgba(0, 0, 0, 0.05);
    color: #000;
  }

  .tags {
    display: flex;
    flex-direction: column;
    color: gray;
    margin: 0px 29px;
  }

  .public {
    color: gray;
    font-size: 18px;
    margin-right: 4px;
  }

  .stars {
    color: rgba(245, 162, 9);
    font-size: 18px;
    margin-right: 4px;
  }

  .work {
    color: rgb(255, 255, 255);
    background-color: rgba(245, 162, 9);
    padding: 0px 1px;
    font-size: 18px;
    margin-right: 4px;
    box-sizing: border-box;
    border-radius: 15%;
  }

  .p {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .info {
    box-sizing: border-box;
    padding: 3px;
  }
`;
