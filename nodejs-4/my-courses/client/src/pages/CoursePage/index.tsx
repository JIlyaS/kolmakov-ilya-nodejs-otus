import React from 'react';
import { useGate, useStore } from "effector-react";
import { Button, Image } from 'antd';

import { course, user } from '../../entities';

import { SCoursePage, SHeaderBlock, STitle, SDescription, SLessonBlock, SText, SLessonTitle, SLessonList, SHeaderAction } from "./styles";
import { useNavigate, useParams } from 'react-router';
import { RollbackOutlined } from '@ant-design/icons';
import { deleteCourse, deleteCourseFx } from '../../entities/course/model';

const CoursePage: React.FC = () => {
  const { CoursePageGate, $currentCourse } = course;
  const { $roles } = user;

  const { id } = useParams();
  const navigate = useNavigate();

  useGate(CoursePageGate, id);

  const currentCourse = useStore($currentCourse);
  const roles = useStore($roles);

  if (!currentCourse) {
    return null;
  }

  const handleDeleteCourseClick = () => {
    deleteCourse(id);
    deleteCourseFx.done.watch(() => {
        console.log('123');
        navigate('/');
    });
  };

  return (
    <SCoursePage>
        <SHeaderBlock>
          <STitle level={2}>{currentCourse.title}</STitle>
          <SHeaderAction>
            {
                roles[0] === "ADMIN" && <Button danger size="small" onClick={handleDeleteCourseClick}>Удалить</Button>
            }
            <Button icon={<RollbackOutlined />} size="small" onClick={() => navigate('/')}>Назад</Button>
          </SHeaderAction>
        </SHeaderBlock>
        <Image
            src={currentCourse.previewImg?.filePath ? `/${currentCourse.previewImg?.filePath}` : ''}
        />
        <SDescription>
            {currentCourse.description}
        </SDescription>
        <SLessonBlock>
          <SLessonTitle level={3}>Список уроков</SLessonTitle>
          {currentCourse?.lessons && currentCourse.lessons.length !== 0 ? <SLessonList></SLessonList> : <SText>Уроков нет</SText>}
        </SLessonBlock>
    </SCoursePage>
  );
}

export default CoursePage;