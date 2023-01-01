import LeftSidebar from '../component/LeftSidebar';
import LoginHeader from '../component/login/LoginHeader';
import Footer from '../component/Footer';
import RightSidebar from '../component/RightSidebar';

const UsersPage = () => {
  return (
    <div>
      <LoginHeader />
      <div style={{ display: 'flex' }}>
        <LeftSidebar />
        <div style={{ backgroundColor: 'pink', width: '100%' }}>
          전체 유저 정보를 받아오면 수정 바로 함! 아직 못 받아왔어요 ㅎ_ㅎ
          ㅠㅠㅠㅠㅠ 죄송합니다..{' '}
        </div>
        <RightSidebar />
      </div>
      <Footer />
    </div>
  );
};

export default UsersPage;
