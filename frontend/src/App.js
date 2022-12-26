// import React from 'react';
// import MyPage from './pages/MyPage';
import 'bootstrap/dist/css/bootstrap.min.css';
// import MainPage from './pages/MainPage';
import MainPage from './pages/MainPage';
import QuestionDetail from './pages/QuestionDetail';
import Footer from './component/Footer';
// import MainQuestions from './component/MainQuesTions';

// 라우터
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/questiondetail" element={<QuestionDetail />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
