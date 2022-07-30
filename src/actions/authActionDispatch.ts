export const CREATE_USER = "CREATE_USER";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const GET_USER_INFO = "GET_USER_INFO";
export const DELETE_POST = "DELETE_POST";
export const UPLOAD_PROFILE_IMAGE = "UPLOAD_PROFILE_IMAGE";
export const READ_NOTIFICATIONS = "READ_NOTIFICATIONS";
export const DELETE_NOTIFICATIONS = "DELETE_NOTIFICATIONS";
export const LEAVE_COMMENT = "LEAVE_COMMENT";
export const LIKE_POST = "LIKE_POST";
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
export interface signOut {
  type: typeof SIGN_OUT;
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
  createdAt: string;
  userId: string;
  likes: string[];
  _id: string;
  comments: Comment[];
}
export interface Notifications {
  _id: string;
  read: boolean;
  sender: string;
  notificationType: string;
}
export interface GetUserInfo {
  _id: string;
  email: string;
  name: string;
  profilePicture: string;
  userPosts: UserPosts[];
  followers: string[];
  following: string[];
  notifications: Notifications[];
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
export interface readNotifications {
  type: typeof READ_NOTIFICATIONS;
}
export interface deleteNotifications {
  type: typeof DELETE_NOTIFICATIONS;
}
export interface leaveComment {
  type: typeof LEAVE_COMMENT;
  payload: UserPosts;
}
export interface likePost {
  type: typeof LIKE_POST;
  payload: UserPosts;
}
export type authActionDispatch =
  | createUser
  | signIn
  | signOut
  | getUserInfo
  | deletePost
  | uploadProfileImage
  | readNotifications
  | deleteNotifications
  | leaveComment
  | likePost;
