import React from "react";
import { useGate, useStore } from "effector-react";
// import { CourseListPageGate, $courseList } from "../entities";

import { SHeader } from "./styles";

type HeaderProps = {
  children: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return <SHeader>{children}</SHeader>
};

export default Header;
