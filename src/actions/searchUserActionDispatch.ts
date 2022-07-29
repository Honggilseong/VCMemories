import { NewPost } from "./postActionDispatch";

export const SEARCH_USER = "SEARCH_USER";
export const FOLLOW_USER = "FOLLOW_USER";
export const LEAVE_COMMENT = "LEAVE_COMMENT";
export const LIKE_POST = "LIKE_POST";
export interface Notifications {
  _id: string;
  read: boolean;
  sender: string;
  notificationType: string;
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
export interface User {
  _id: string;
  email: string;
  name: string;
  profilePicture: string;
  userPosts: UserPosts[];
  followers: string[];
  following: string[];
  notifications: Notifications[];
}
export interface getSearchingUser {
  type: typeof SEARCH_USER;
  payload: User;
}
export interface followUser {
  type: typeof FOLLOW_USER;
  payload: User;
}
export interface leaveComment {
  type: typeof LEAVE_COMMENT;
  payload: NewPost;
}
export interface likePost {
  type: typeof LIKE_POST;
  payload: NewPost;
}
export type searchUserActionDispatch =
  | getSearchingUser
  | followUser
  | leaveComment
  | likePost;
