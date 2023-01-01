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
        <div style={{ backgroundColor: 'white', width: '100%' }}> </div>
        <RightSidebar />
      </div>
      <Footer />
    </div>
  );
};

export default UsersPage;
