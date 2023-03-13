import React from 'react';
import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { Button } from 'antd';


import CourseListPage from './pages/CourseListPage';
import AddCoursePage from './pages/AddCoursePage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import CoursePage from './pages/CoursePage';
import { Header } from './components';
import { isJsonObject } from './utils';

import { SApp, SHeaderWrap, SContent, SFooter } from './styles';
import { useStore } from 'effector-react';
import { $roles } from './entities/user/model';

const ContentApp: React.FC = () => {
  const navigate = useNavigate();
  const roles = useStore($roles);

  const logout = () => {
    navigate('/login');
    localStorage.clear();
  }

  const login = () => {
    navigate('/login');
  }

  return (
    <div style={{ 'marginTop': "80px" }}><Header>
            <SHeaderWrap>
            {roles[0] === "ADMIN" ? (
              <>
              <Button onClick={() => navigate('/add-course')}>Создать курс</Button>
              <Button onClick={logout}>Выйти</Button>
              </>
            ) : (
              <Button onClick={login}>Войти</Button>
            )}
            </SHeaderWrap>
          </Header><Outlet />
          <SFooter></SFooter></div>
  );
}

const App: React.FC = () => {
  return (
    <SApp>
      <SContent>
        <Routes>
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ContentApp />}>
            <Route path="/" element={<CourseListPage />} />
            <Route path="/add-course" element={<AddCoursePage />} />
            <Route path="/course/:id" element={<CoursePage />} />
          </Route>
        </Routes>
      </SContent>
    </SApp>
  );
}

export default App;
