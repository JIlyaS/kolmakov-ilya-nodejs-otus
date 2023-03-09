import React from 'react';
import { useGate, useStore } from "effector-react";
import { course } from '../../entities';
import { CourseItem } from "../../components";

import { SCourseList } from "./styles";

const CourseListPage: React.FC = () => {
  const { CourseListPageGate, $courseList } = course;

  useGate(CourseListPageGate);

  const courseList = useStore($courseList);
  return (
    <SCourseList>
      {courseList.map((item) => (
        <CourseItem title={item.title} />
      ))}
    </SCourseList>
  );
}

export default CourseListPage;
