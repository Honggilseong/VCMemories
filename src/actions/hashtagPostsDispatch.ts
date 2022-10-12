export const GET_HASHTAG_POSTS = "GET_HASHTAG_POSTS";
export const HASHTAG_LIKE_POST = "HASHTAG_LIKE_POST";
export const HASHTAG_LEAVE_COMMENT = "HASHTAG_LEAVE_COMMENT";
export const HASHTAG_DELETE_COMMENT = "HASHTAG_DELETE_COMMENT";
export interface Comment {
  commentUserId: string;
  commentUserName: string;
  comment: string;
  _id?: string;
}
export interface HashTagPost {
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
  createdAt: string;
  postType: string;
  images: string[];
}

export interface getHashtagPosts {
  type: typeof GET_HASHTAG_POSTS;
  payload: HashTagPost;
}

export interface likePost {
  type: typeof HASHTAG_LIKE_POST;
  payload: HashTagPost;
}
export interface leaveComment {
  type: typeof HASHTAG_LEAVE_COMMENT;
  payload: HashTagPost;
}
interface DeleteComment {
  postId: string;
  commentId: string;
}
export interface deleteUserComment {
  type: typeof HASHTAG_DELETE_COMMENT;
  payload: DeleteComment;
}
export type hashtagPostsDispatch =
  | getHashtagPosts
  | leaveComment
  | likePost
  | deleteUserComment;
