export const CREATE_POST = "CREATE_POST";
export const GET_POSTS = "GET_POSTS";
export const DELETE_POST = "DELETE_POST";
export const LIKE_POST = "LIKE_POST";
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
  type: typeof DELETE_POST;
  payload: string;
}

export interface likePost {
  type: typeof LIKE_POST;
  payload: NewPost;
}
export type postActionDispatch = createPost | getPosts | deletePost | likePost;
