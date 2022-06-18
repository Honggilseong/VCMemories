export const CREATE_USER = "CREATE_USER";
export const SIGN_IN = "SIGN_IN";
export const GET_USER_INFO = "GET_USER_INFO";
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

export interface UserPosts {
  title: string;
  picture: string;
  message: string;
  tags: string[];
  name: string;
  profilePicture: string;
  userId: string;
  likes: string[];
  _id: string;
}
export interface GetUserInfo {
  _id: string;
  email: string;
  name: string;
  profilePicture: string;
  userPosts: UserPosts[];
  followers: string[];
  following: string[];
}
export interface getUserInfo {
  type: typeof GET_USER_INFO;
  payload: UserInfo;
}
export type authActionDispatch = createUser | signIn | getUserInfo;
