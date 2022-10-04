export const GET_BOARDPOST = "GET_BOARDPOST";
export const BOARDPOST_LEAVE_COMMENT = "BOARDPOST_LEAVE_REPLY";
export const BOARDPOST_LEAVE_REPLY = "BOARDPOST_LEAVE_REPLY";
export const BOARDPOST_LIKE = "BOARDPOST_LIKE";
export const BOARDPOST_LIKE_COMMENT = "BOARDPOST_LIKE_COMMENT";
export const BOARDPOST_LIKE_REPLY = "BOARDPOST_LIKE_REPLY";
export const BOARDPOST_DELETE_COMMENT = "BOARDPOST_DELETE_COMMENT";
export const BOARDPOST_DELETE_REPLY = "BOARDPOST_DELETE_REPLY";
export const BOARDPOST_EDIT_COMMENT = "BOARDPOST_EDIT_COMMENT";
export const BOARDPOST_EDIT_REPLY = "BOARDPOST_EDIT_REPLY";
export interface Reply {
  commentUserId: string;
  commentUserName: string;
  comment: string;
  _id?: string;
  createdAt?: number;
  updatedAt?: number | null;
  likes?: string[];
  commentId?: string;
}
export interface Comment {
  commentUserId: string;
  commentUserName: string;
  comment: string;
  _id?: string;
  createdAt?: number;
  updatedAt?: number | null;
  likes?: string[];
  replies?: Reply[];
}

export interface BoardPost {
  title: string;
  username: string;
  content: string;
  category: string;
  userId: string;
  channel: string;
  views: number;
  likes: string[];
  updatedAt: number;
  _id: string;
  createdAt: number | null;
  comments: Comment[];
}

export interface getBoardPost {
  type: typeof GET_BOARDPOST;
  payload: BoardPost;
}
export interface boardPostLeaveComment {
  type: typeof BOARDPOST_LEAVE_COMMENT;
  payload: BoardPost;
}
export interface boardPostLeaveReply {
  type: typeof BOARDPOST_LEAVE_REPLY;
  payload: BoardPost;
}
export interface boardPostLike {
  type: typeof BOARDPOST_LIKE;
  payload: BoardPost;
}
export interface boardPostLikeComment {
  type: typeof BOARDPOST_LIKE_COMMENT;
  payload: BoardPost;
}
export interface boardPostLikeReply {
  type: typeof BOARDPOST_LIKE_REPLY;
  payload: BoardPost;
}
export interface boardPostDeleteComment {
  type: typeof BOARDPOST_DELETE_COMMENT;
  payload: BoardPost;
}
export interface boardPostDeleteReply {
  type: typeof BOARDPOST_DELETE_REPLY;
  payload: BoardPost;
}
export interface boardPostEditComment {
  type: typeof BOARDPOST_EDIT_COMMENT;
  payload: { commentId: string; editComment: string };
}
export interface boardPostEditReply {
  type: typeof BOARDPOST_EDIT_REPLY;
  payload: BoardPost;
}
export type boardPostDispatch =
  | getBoardPost
  | boardPostLeaveComment
  | boardPostLeaveReply
  | boardPostLike
  | boardPostLikeComment
  | boardPostLikeReply
  | boardPostDeleteComment
  | boardPostDeleteReply
  | boardPostEditComment
  | boardPostEditReply;
