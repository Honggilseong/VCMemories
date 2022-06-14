export const CREATE_POST = "CREATE_POST";
export const GET_POSTS = "GET_POSTS";

export interface NewPost {
  title: string;
  picture: string;
  message: string;
  tags: string[];
  name: string;
  profilePicture: string;
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

export type postActionDispatch = createPost | getPosts;
