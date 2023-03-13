import { AxiosPromise } from "axios";

import { apiInstance } from "../../axiosInstance";
import {
  RegistrationDTO,
  RegistrationRequest,
  LoginRequest,
  LoginDTO,
} from "./types";

export const registration = (
  data: RegistrationRequest
): AxiosPromise<RegistrationDTO> =>
  apiInstance
    .post(`/api/v1/auth/registration`, data);

export const login = (data: LoginRequest): AxiosPromise<LoginDTO> =>
  apiInstance.post(`/api/v1/auth/login`, data);
