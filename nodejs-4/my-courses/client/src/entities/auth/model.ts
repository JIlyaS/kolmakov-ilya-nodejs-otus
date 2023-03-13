import {
  createStore,
  combine,
  createEffect,
  createEvent,
  sample,
  merge,
} from "effector";
import { createGate } from "effector-react";

import { login, registration } from "../../api/rest/auth";
import { Login, Registration } from "../../api/rest/auth/types";
import { getCourses, createCourse } from "../../api/rest/courses";
import { Course } from "../../api/rest/courses/types";

const regNewUser = createEvent<Registration>();
const loginUser = createEvent<Login>();

const regNewUserFx = createEffect((data: Registration) => registration(data));
const loginUserFx = createEffect((data: Login) => login(data));

sample({
  clock: regNewUser,
  target: regNewUserFx,
});

sample({
  clock: loginUser,
  target: loginUserFx,
});

sample({
  clock: loginUserFx.doneData,
  fn: (data) => {
    localStorage.setItem("token", data.data.token);
    localStorage.setItem("userId", data.data.userId);
  }
});

export { regNewUser, regNewUserFx, loginUser, loginUserFx };
