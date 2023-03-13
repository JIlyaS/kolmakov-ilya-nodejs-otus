import { AxiosPromise } from "axios";

import { apiInstance } from "../../axiosInstance";
import { Course } from "./types";

export const getCourses = (): AxiosPromise<Course[]> =>
  apiInstance.get(`/api/v1/courses`).then((payload) => payload.data);

export const createCourse = (data: Course): AxiosPromise<Course> =>
  apiInstance.post(`/api/v1/courses`, data).then((payload) => payload.data);

export const getCourse = (id: string): AxiosPromise<Course> => apiInstance.get(`/api/v1/courses/${id}`).then((payload) => payload.data);

export const deleteCourse = (id: string | undefined): AxiosPromise<{ id: string }>  => apiInstance.delete(`/api/v1/courses/${id}`).then((payload) => payload.data);
// export const updateCourses = (data: CourseRequest[]): AxiosPromise<Course[]> =>
//   apiInstance.put(`/profile/courses`, data).then((payload) => payload.data);

// export const getUserCourses = (profileId: string): AxiosPromise<Course[]> =>
//   apiInstance
//     .get(`/profiles/${profileId}/courses`)
//     .then((payload) => payload.data);
