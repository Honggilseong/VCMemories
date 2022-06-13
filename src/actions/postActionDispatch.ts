export const CREATE_POST = "CREATE_POST";

export interface createPost {
  type: typeof CREATE_POST;
}

export type postActionDispatch = createPost;
