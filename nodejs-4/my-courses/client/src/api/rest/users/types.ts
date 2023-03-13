export type Role = {
  value: string;
};

export type User = {
    _id: string;
    login: string;
    password: string;
    username: string;
    email?: string;
    roles: string[];
  };
