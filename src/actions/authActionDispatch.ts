export const CREATE_USER = "CREATE_USER";
export const SIGN_IN = "SIGN_IN";
export const GET_USER_INFO = "GET_USER_INFO";
export const DELETE_POST = "DELETE_POST";
export const UPLOAD_PROFILE_IMAGE = "UPLOAD_PROFILE_IMAGE";
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
interface Comment {
  commentUserId: string;
  commentUserName: string;
  comment: string;
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
  comments: Comment[];
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
export interface deletePost {
  type: typeof DELETE_POST;
  payload: string;
}
export interface uploadProfileImage {
  type: typeof UPLOAD_PROFILE_IMAGE;
  payload: string;
}
export type authActionDispatch =
  | createUser
  | signIn
  | getUserInfo
  | deletePost
  | uploadProfileImage;
