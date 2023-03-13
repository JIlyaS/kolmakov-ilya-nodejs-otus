import { AxiosPromise } from "axios";

import { apiInstance } from "../../axiosInstance";
import { User } from "./types";

export const getUsers = (): AxiosPromise<User[]> =>
  apiInstance.get(`/api/v1/users`);

export const getUser = (id: string): AxiosPromise<User> =>
  apiInstance.get(`/api/v1/users/${id}`)
