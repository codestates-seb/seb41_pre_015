// import React from 'react';
// import MyPage from './pages/MyPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignupPage from './pages/SignupPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import MyPage from './pages/MyPage';
import AddQuestionPage from './pages/AddQuestionPage';
import QuestionDetail from './pages/QuestionDetail';
import MypageEdit from './pages/MypageEdit';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/addquestion" element={<AddQuestionPage />} />
          <Route path="/questions" element={<QuestionDetail />} />
          <Route path="/editmypage" element={<MypageEdit />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
