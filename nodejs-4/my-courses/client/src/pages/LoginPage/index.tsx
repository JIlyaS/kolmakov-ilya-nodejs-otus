import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Form,
  Input,
  Upload,
} from 'antd';

import { auth } from '../../entities';

import { SRegistration, SRegistrationBlock, STitle } from "./styles";
import type { Login } from '../../api/rest/auth/types';

const LoginPage: React.FC = () => {
  const { loginUser, loginUserFx } = auth;

  const navigate = useNavigate();

  const onSubmit = (data: Login) => {
    loginUser(data);
    loginUserFx.done.watch(() => {
      navigate('/');
    });
  };

  return (
    <SRegistration>
      <SRegistrationBlock>
        <STitle>Авторизация</STitle>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="vertical"
          onFinish={onSubmit}
        >
          <Form.Item label="Логин" name="login" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Пароль" name="password" rules={[{ required: true }]}>
            <Input type="password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
            <Button type="text" onClick={() => navigate('/registration')}>
              Нет пользователя? Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
      </SRegistrationBlock>
    </SRegistration>
  );
}

export default LoginPage;
