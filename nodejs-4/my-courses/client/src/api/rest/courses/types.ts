export type PreviewImg = {
  fileName: string;
  filePath: string;
  fileType: string;
  fileSize: string;
}

export type Course = {
  _id: string;
  title: string;
  description: string;
  createdAt?: Date;
  lessons?: string[];
  previewImg?: PreviewImg | null;
  // id: string;
  // completionDate: string;
  // name: string;
  // organizationName: string;
  // editable: boolean;
};

// export type CourseRequest = {
//   completionDate: string;
//   name: string;
//   organizationName: string;
// };
