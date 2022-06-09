export const CREATE_USER = "CREATE_USER";

export interface UserInfo {
  email: string;
  password: string;
  name: string;
  token?: string;
}

export interface createUser {
  type: typeof CREATE_USER;
  payload: UserInfo;
}

export type authActionDispatch = createUser;
