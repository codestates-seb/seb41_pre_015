// import React from 'react';
import styled from 'styled-components';
import companyLogo from '../images/stack_overflow_logo_icon.png';
import CreateIcon from '@mui/icons-material/Create';
import GoogleIcon from '../images/google_cloud_logo_icon.png';
import TwilioIcon from '../images/twilio_logo_icon.png';

const RightSidebar = () => {
  return (
    <RightSidebarContainer>
      <div style={{ width: '200px', backgroundColor: 'lightgoldenrodyellow' }}>
        <Sidebaryellow>
          <header>The Overflow Blog</header>
          <ul>
            <li>
              <CreateIcon /> Goodbye Webpack, hello Turbopack! The big news from
              <br /> todays Next.JS conference
            </li>
            <li>
              <CreateIcon /> CEO update: Breaking down barriers to unlock
              innovation
            </li>
          </ul>
          <header>Featured on Meta</header>
          <ul>
            <li>
              <img src={companyLogo} alt=" " style={{ marginBottom: '1px' }} />
              The 2022 Community-a-thon has begun!
            </li>
            <li>
              <img src={companyLogo} alt=" " />
              Mobile app infrastructure being decommissioned
            </li>
            <li>
              <img src={companyLogo} alt=" " />
              Staging Ground Workflow: Canned Comments
            </li>
            <li>
              <img src={companyLogo} alt=" " />
              The Ask Wizard has graduated
            </li>
          </ul>
          <header>Hot Meta Posts</header>
          <ul>
            <li>
              <NumberBadge>23</NumberBadge>
              How are bounties awarded to ChatGPT-sourced answerers handled?
            </li>
            <li>
              <NumberBadge>19</NumberBadge>
              How to schedule multiple notifications with Flutter within the
              same day?
            </li>
          </ul>
        </Sidebaryellow>
        <div>
          <SidebarCollective>
            <header>Collectives</header>
            <CollectiveItem>
              <div>
                <IconContainer>
                  <img src={GoogleIcon} alt=" " />
                </IconContainer>
                <CollectiveNameGroup>
                  <p>Google Cloud</p>
                  <small>31k Members</small>
                </CollectiveNameGroup>
                <CollectButton>Join</CollectButton>
              </div>
              <TextBox>
                Google Cloud provides organizations with leading infrastructure,
                platform capabilities
              </TextBox>
            </CollectiveItem>

            <CollectiveItem>
              <div>
                <IconContainer>
                  <img src={TwilioIcon} alt=" " />
                </IconContainer>
                <CollectiveNameGroup>
                  <p>Twilio</p>
                  <small>6k Members</small>
                </CollectiveNameGroup>
                <CollectButton>Join</CollectButton>
              </div>
              <TextBox>
                Twilio has democratized channels like voice, text, chat, video,
                and email by virtualizing...
              </TextBox>
            </CollectiveItem>
          </SidebarCollective>
        </div>
      </div>
    </RightSidebarContainer>
  );
};

export default RightSidebar;

export const RightSidebarContainer = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
  & > a {
    width: 100%;
    & > img {
      width: 100%;
    }
  }
`;

export const Sidebar = styled.div`
  border-radius: 3px;
  color: #525960;
  box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);
  header {
    padding: 12px 15px;
    font-size: 13px;
    font-weight: 700;
  }
  ul {
    padding: 4px 15px;
  }
`;

export const Sidebaryellow = styled(Sidebar)`
  border: 1px solid hsl(47, 65%, 84%);
  background-color: hsl(47, 83%, 91%);
  header {
    border-top: 1px solid hsl(47, 65%, 84%);
    border-bottom: 1px solid hsl(47, 65%, 84%);
    &:first-child {
      border-top: none;
    }
  }
  ul {
    padding: 4px 15px;
    background-color: #faf5e6;
  }
  li {
    display: flex;
    align-items: flex-start;
    gap: 7px;
    margin: 12px 0;
    font-size: 13px;
    list-style: inside;
    list-style-type: none;
  }
  svg {
    flex-shrink: 0;
  }
`;

export const SidebarCollective = styled(Sidebar)`
  border: 1px solid hsl(210, 8%, 85%);
  header {
    border-bottom: 1px solid hsl(210, 8%, 90%);
    background-color: #f8f9f9;
  }
  ul {
    background-color: hsl(0, 0%, 100%);
  }
`;

export const CollectiveItem = styled.div`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 0;
  padding: 16px;
  font: inherit;
  font-size: 100%;
  margin: auto;
  > div:first-child {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: flex-start;
  }
`;

export const TextBox = styled.div`
  margin-top: 10px;
  color: #3b4045;
  font-size: 13px;
  line-height: 17px;
`;

export const IconContainer = styled.div`
  display: flex;
  margin-right: 5px;
`;

export const CollectiveNameGroup = styled.div`
  width: 100%;
  padding-left: 10px;
  > p {
    color: #6a737c;
    font-size: 14.3px;
    font-weight: 500;
  }
  > small {
    font-size: 12px;
    color: #3b4045;
  }
`;

export const CollectButton = styled.button`
  border-radius: 3px;
  border: 1px solid transparent;
  padding: 2px 9px;
  height: 35px;
  background-color: unset;
  border-color: hsl(206, 85%, 57.5%);
  color: hsl(206, 100%, 40%);
  transition: all 0.4s ease 0s;
  font-size: 0.85rem;
  cursor: pointer;
  outline: none;
  text-align: center;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: hsl(206, 100%, 97%);
  }
`;

// Icons

// export const ChatIcon = styled.div`
//   background-image: url(${Icons});
//   background-size: 16px 7038px;
//   background-position: 0 -6120px;
//   width: 16px;
//   height: 16px;
//   flex-shrink: 0;
// `;

// export const LogoIcon = styled(ChatIcon)`
//   background-position: 0 -6156px;
// `;

export const NumberBadge = styled.span`
  color: hsl(210, 8%, 45%); ;
`;
