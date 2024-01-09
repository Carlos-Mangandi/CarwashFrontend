export interface GetLoginData {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  rolId: number;
}

export interface Response {
  token: string;
  user?: User;
}
