export const CREATE_POST = "CREATE_POST";

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

export type postActionDispatch = createPost;
