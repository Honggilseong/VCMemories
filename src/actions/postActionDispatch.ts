export const CREATE_POST = "CREATE_POST";
export const GET_POSTS = "GET_POSTS";
export const POST_DELETE_POST = "POST_DELETE_POST";
export const POST_LIKE_POST = "POST_LIKE_POST";
export const POST_LEAVE_COMMENT = "POST_LEAVE_COMMENT";
export const RESET_POSTS = "RESET_POSTS";
export const POST_DELETE_COMMENT = "POST_DELETE_COMMENT";
export interface Comment {
  commentUserId: string;
  commentUserName: string;
  comment: string;
  _id?: string;
}
export interface NewPost {
  title: string;
  picture: string;
  message: string;
  tags: string[];
  name: string;
  profilePicture: string;
  userId: string;
  likes: string[];
  _id?: string;
  comments: Comment[];
  isEdit: boolean;
}

export interface createPost {
  type: typeof CREATE_POST;
  payload: NewPost;
}

export type PostsState = NewPost[];

export interface getPosts {
  type: typeof GET_POSTS;
  payload: PostsState;
}

export interface deletePost {
  type: typeof POST_DELETE_POST;
  payload: string;
}

export interface likePost {
  type: typeof POST_LIKE_POST;
  payload: NewPost;
}

export interface leaveComment {
  type: typeof POST_LEAVE_COMMENT;
  payload: NewPost;
}
export interface resetPosts {
  type: typeof RESET_POSTS;
}
interface DeleteComment {
  postId: string;
  commentId: string;
}
export interface deleteUserComment {
  type: typeof POST_DELETE_COMMENT;
  payload: DeleteComment;
}
export type postActionDispatch =
  | createPost
  | getPosts
  | deletePost
  | likePost
  | leaveComment
  | resetPosts
  | deleteUserComment;
