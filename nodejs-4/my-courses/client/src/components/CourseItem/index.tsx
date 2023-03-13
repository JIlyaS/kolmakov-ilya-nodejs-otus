import React from "react";
import { useGate, useStore } from "effector-react";
// import { CourseListPageGate, $courseList } from "../entities";

import { SCourseItem } from "./styles";
import placeholder from './placeholder.jpeg';
import { PreviewImg } from "../../api/rest/courses/types";
import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

type CourseItemProps = {
  id: string;
  title: string;
  description?: string;
  previewImg?: PreviewImg | null;
};

const CourseItem: React.FC<CourseItemProps> = ({ id, title, description, previewImg }) => {
  // useGate(CourseListPageGate);
  const navigate = useNavigate();

  // const courseList = useStore($courseList);
  return <SCourseItem 
    hoverable
    cover={<img alt="example" 
    src={previewImg?.filePath ? previewImg?.filePath : placeholder} />}
    style={{ width: 400 }}
    actions={[
      <EditOutlined key="edit" onClick={() => navigate(`/course/${id}`)} />,
    ]}
  >
    <Card.Meta title={title} description={description} />
  </SCourseItem>
};

export default CourseItem;
