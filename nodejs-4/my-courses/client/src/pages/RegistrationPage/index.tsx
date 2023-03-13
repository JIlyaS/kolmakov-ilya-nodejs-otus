import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Select } from 'antd';

import { auth } from '../../entities';

import { SRegistration, SRegistrationBlock, STitle } from "./styles";
import type { Registration } from '../../api/rest/auth/types';

const RegistrationPage: React.FC = () => {
  const { regNewUser, regNewUserFx } = auth;

  const navigate = useNavigate();

  const onSubmit = (data: Registration) => {
    regNewUser(data);
    regNewUserFx.done.watch(() => {
      navigate('/login');
    });
  };

  return (
    <SRegistration>
      <SRegistrationBlock>
        <STitle>Регистрация</STitle>
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
          <Form.Item label="ФИО" name="username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Роль" name="role">
            <Select
              defaultValue="Пользователь"
              options={[
                { label: 'Пользователь', value: 'USER' },
                { label: 'Администратор', value: 'ADMIN' },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Регистрация
            </Button>
            <Button type="text" onClick={() => navigate('/login')}>
              Уже есть логин? Войти
            </Button>
          </Form.Item>
        </Form>
      </SRegistrationBlock>
    </SRegistration>
  );
}

export default RegistrationPage;
