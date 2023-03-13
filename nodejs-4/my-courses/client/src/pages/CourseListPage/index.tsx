import React, { useEffect } from 'react';
import { useGate, useStore } from "effector-react";
import { course, user } from '../../entities';
import { CourseItem } from "../../components";

import { SCourseList } from "./styles";

const CourseListPage: React.FC = () => {
  const { CourseListPageGate, $courseList } = course;
  const { $userId, getUser } = user;

  useGate(CourseListPageGate);

  const courseList = useStore($courseList);
  const userId = useStore($userId);

  useEffect(() => {
    userId && getUser(userId);
  }, [userId]);

  return (
    <SCourseList>
      {courseList.map((item) => (
        <CourseItem
          key={item._id}
          id={item._id}
          title={item.title} 
          description={item.description} 
          previewImg={item.previewImg} 
        />
      ))}
    </SCourseList>
  );
}

export default CourseListPage;
