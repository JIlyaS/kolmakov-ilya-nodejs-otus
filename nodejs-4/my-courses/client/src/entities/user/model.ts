import {
    createEffect,
    createEvent,
    createStore,
    sample,
  } from "effector";
  import { persist } from 'effector-storage/local';

  import { getUsers as getUsersApi, getUser as getUserApi } from "../../api/rest/users";
  import { Role, User } from "../../api/rest/users/types";
  import { loginUserFx } from "../auth/model";

  const $userId = createStore<string | null>(null);
  const $currentUser = createStore<User | null>(null);
  const $roles = createStore<string[]>([]);
  
  const getUsers = createEvent();
  const getUser = createEvent<string>();
  
  const getUsersFx = createEffect(() => getUsersApi());
  const getUserFx = createEffect((id: string) => getUserApi(id));
  
  sample({
    clock: loginUserFx.doneData,
    fn: (data) => data.data.userId, 
    target: $userId
  });

  persist({ store: $userId, key: 'userId' })
  
  
  sample({
    clock: getUsers,
    target: getUsersFx,
  });
  
  sample({
    clock: getUser,
    target: getUserFx,
  });

  sample({
    clock: $currentUser,
    fn: (data) => data?.roles ?? [],
    target: $roles 
  });

  persist({
    store: $roles,
    key: 'roles'
  });

  sample({
    clock: getUserFx.doneData,
    fn: (data) => {
        localStorage.setItem("roles", JSON.stringify(data.data.roles));
        return data.data.roles;
    },
    target: $roles
  });
  
  export { getUser, $userId, $roles };
  