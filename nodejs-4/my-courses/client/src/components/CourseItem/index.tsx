import React from "react";
import { useGate, useStore } from "effector-react";
// import { CourseListPageGate, $courseList } from "../entities";

import { SCourseItem } from "./styles";

type CourseItemProps = {
  title: string;
};

const CourseItem: React.FC<CourseItemProps> = ({ title }) => {
  // useGate(CourseListPageGate);

  // const courseList = useStore($courseList);
  return <SCourseItem>{title}</SCourseItem>
};

export default CourseItem;
