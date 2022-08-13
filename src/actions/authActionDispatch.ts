export const CREATE_USER = "CREATE_USER";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const GET_USER_INFO = "GET_USER_INFO";
export const USER_DELETE_POST = "USER_DELETE_POST";
export const UPLOAD_PROFILE_IMAGE = "UPLOAD_PROFILE_IMAGE";
export const READ_NOTIFICATIONS = "READ_NOTIFICATIONS";
export const DELETE_NOTIFICATIONS = "DELETE_NOTIFICATIONS";
export const USER_LEAVE_COMMENT = "USER_LEAVE_COMMENT";
export const USER_LIKE_POST = "USER_LIKE_POST";
export const DELETE_USER = "DELETE_USER";
export const SEND_FOLLOW_REQUEST = "SEND_FOLLOW_REQUEST";
export const ACCEPT_FOLLOW_REQUEST = "ACCEPT_FOLLOW_REQUEST";
export const DELETE_FOLLOW_REQUEST = "DELETE_FOLLOW_REQUEST";
export const SWITCH_ACCOUNT_STATE = "SWITCH_ACCOUNT_STATE";
export const DELETE_ALL_FOLLOW_REQUESTS = "DELETE_ALL_FOLLOW_REQUESTS";
export const USER_DELETE_COMMENT = "USER_DELETE_COMMENT";
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
  _id: string;
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
export interface FollowRequests {
  _id: string;
  username: string;
  profileImage: string;
  userId: string;
}
export interface BlockUsers {
  _id: string;
  username: string;
  profileImage: string;
  userId: string;
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
  isPrivate: boolean;
  userTitle: string;
  followRequests: FollowRequests[];
  blockUsers: BlockUsers[];
}

export interface getUserInfo {
  type: typeof GET_USER_INFO;
  payload: UserInfo;
}

export interface deletePost {
  type: typeof USER_DELETE_POST;
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
  type: typeof USER_LEAVE_COMMENT;
  payload: UserPosts;
}

export interface likePost {
  type: typeof USER_LIKE_POST;
  payload: UserPosts;
}
export interface deleteUser {
  type: typeof DELETE_USER;
}
export interface sendFollowRequest {
  type: typeof SEND_FOLLOW_REQUEST;
}
export interface acceptFollowRequest {
  type: typeof ACCEPT_FOLLOW_REQUEST;
  payload: string;
}
export interface deleteFollowRequest {
  type: typeof DELETE_FOLLOW_REQUEST;
  payload: string;
}
export interface switchAccountState {
  type: typeof SWITCH_ACCOUNT_STATE;
}
export interface deleteAllFollowRequests {
  type: typeof DELETE_ALL_FOLLOW_REQUESTS;
}
interface UserDeleteComment {
  postId: string;
  commentId: string;
}
export interface deleteUserComment {
  type: typeof USER_DELETE_COMMENT;
  payload: UserDeleteComment;
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
  | likePost
  | deleteUser
  | sendFollowRequest
  | acceptFollowRequest
  | deleteFollowRequest
  | switchAccountState
  | deleteAllFollowRequests
  | deleteUserComment;
