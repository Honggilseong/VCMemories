export const CREATE_USER = "CREATE_USER";
export const SIGN_IN = "SIGN_IN";
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
export interface signIn {
  type: typeof SIGN_IN;
  payload: UserInfo;
}

export type authActionDispatch = createUser | signIn;
