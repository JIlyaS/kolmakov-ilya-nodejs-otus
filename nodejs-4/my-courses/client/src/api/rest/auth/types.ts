export type Registration = {
  login: string;
  password: string;
  username: string;
  email?: string;
  role: string;
};

export type RegistrationRequest = {
  login: string;
  password: string;
  username: string;
  email?: string;
  role: string;
};

export type RegistrationDTO = {
  message: string;
};

export type LoginRequest = {
  login: string;
  password: string;
};

export type Login = {
  login: string;
  password: string;
};

export type LoginDTO = { 
  token: string; 
  userId: string; 
};
