import styled from 'styled-components';

const MypageTitle = () => {
  return (
    <MypageHeaderContainer>
      <div className="mypage_header">
        <div className="user_profile_img">
          <img
            src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FekfshA%2FbtqUnKjFURC%2FAK2XK3NwkQZCHjNKBOPz00%2Fimg.jpg"
            alt=" "
          />
        </div>
        <div className="user_profile_info">
          <div>
            <h1 className="userName">이지은 (Lee ji eun)</h1>
          </div>
          <ul className="user_profile_memo">
            <li>Member for 4 months </li>
            <li>Last seen this week </li>
            <li>Visited 16 days </li>
          </ul>
        </div>
      </div>
    </MypageHeaderContainer>
  );
};
export default MypageTitle;

const MypageHeaderContainer = styled.div`
  display: flex;
  //유저 프로필 인포 css
  .mypage_header {
    grid-area: mypage_header;
    display: flex;
    .user_profile_img {
      display: flex;
      width: 200px;
      height: 200px;
    }
    .user_profile_info {
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: smaller;
      h1 {
        margin-top: 0px;
        margin-bottom: 10px;
      }
      h2 {
        margin-top: 0px;
        margin-bottom: 10px;
      }
    }
    .user_name {
      margin-left: 5px;
    }

    .user_profile_memo {
      display: flex;
      width: 100%;
      margin-top: 5px;
      margin-bottom: 10px;
      & li {
        margin-right: 30px;
      }
    }
  }
  // 유저 인포 edit 버튼 css
  .user_profile_btn {
    display: flex;
    align-items: baseline;
    justify-content: end;
    position: absolute;
    right: 130px;
    top: 20px;
    button {
      background-color: #2d2d2d;
      padding: 10px;
      margin-right: 5px;
      color: #c4c8cc;
      border: 1px solid #7d858d;
      cursor: pointer;
      &:hover {
        background-color: #353738;
      }
    }
  }
`;
