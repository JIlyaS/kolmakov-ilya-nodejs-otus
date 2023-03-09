import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Button } from 'antd';


import CourseListPage from './pages/CourseListPage';
import AddCoursePage from './pages/AddCoursePage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import { Header } from './components';

import { SApp, SHeaderWrap, SContent } from './styles';

const App = () => {

  const navigate = useNavigate();
  return (
    <SApp>
      <SContent>
        <Routes>
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={[<div style={{ 'marginTop': "80px" }}><Header>
            <SHeaderWrap>
              <Button onClick={() => navigate('/add-course')}>Создать курс</Button>
            </SHeaderWrap>
          </Header><CourseListPage /></div>]} />
          <Route path="/add-course" element={<div style={{ 'marginTop': "80px" }}><Header>
            <SHeaderWrap>
              <Button onClick={() => navigate('/add-course')}>Создать курс</Button>
            </SHeaderWrap>
          </Header><AddCoursePage /></div>} />
        </Routes>
      </SContent>
    </SApp>
  );
}

export default App;
