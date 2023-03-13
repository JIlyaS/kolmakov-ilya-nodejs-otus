import styled from "styled-components";
import { Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

export const SCoursePage = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 600px;
  margin: 0 auto;
  width: 100%;
`;

export const SHeaderBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SHeaderAction = styled.div`
  display: flex;
  gap: 8px;
`;

export const STitle = styled(Title)`
 margin-bottom: 30px !important;
`;

export const SDescription = styled(Paragraph)`
  margin-top: 20px !important;
`;

export const SLessonBlock = styled.div`

`;

export const SText = styled(Text)`
`;

export const SLessonTitle = styled(Title)``;

export const SLessonList = styled.div`
  display: flex;
  flex-direction: column;

  padding-bottom: 50px;
`;