import React from 'react';
import {
  Button,
  Form,
  Input,
  Upload,
} from 'antd';
import { PlusOutlined, RollbackOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd/es/form';

import { SAddCoursePage, SAddCourseHeaderWrap, STitle } from "./styles";
import { course } from '../../entities';
import { Course } from '../../api/rest/courses/types';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const AddCoursePage: React.FC = () => {
  const formRef = React.useRef<FormInstance>(null);
  const { addCourse, addCourseFx } = course;

  const navigate = useNavigate();

  const onSubmit = (value: Course) => {
    addCourse(value);
    addCourseFx.done.watch(() => {
      navigate('/');
    });
  };

  const onReset = () => {
    formRef.current?.resetFields();
  }

  return (
    <SAddCoursePage>
      <SAddCourseHeaderWrap>
        <STitle>Создать курс</STitle>
        <Button icon={<RollbackOutlined />} size="small" onClick={() => navigate('/')}>Назад</Button>
      </SAddCourseHeaderWrap>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="vertical"
        onFinish={onSubmit}
        ref={formRef}
        encType="multipart/form-data"
      >
        <Form.Item label="Заголовок" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Описание" name="description">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Загрузить превью">
          {/* valuePropName="fileList" */}
          <Upload
            action="http://localhost:8080/api/v1/courses/preview/upload"
            listType="picture-card"
            method='post'
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Загрузить</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Очистить
          </Button>
        </Form.Item>
      </Form>
    </SAddCoursePage>
  );
}

export default AddCoursePage;
