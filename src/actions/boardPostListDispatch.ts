export const GET_BOARDPOST_LIST = "GET_BOARDPOST_LIST";

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

export interface BoardPostList {
  boardPosts: BoardPost[];
  pagination: { count: number; pageCount: number };
}

export interface getBoardPostList {
  type: typeof GET_BOARDPOST_LIST;
  payload: BoardPostList;
}

export type boardPostListDispatch = getBoardPostList;
