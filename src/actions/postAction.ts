import { Dispatch } from "redux";
import { CREATE_POST, GET_POSTS, NewPost } from "./postActionDispatch";
import * as api from "../api";

export const createPost = (newPost: NewPost) => async (dispatch: Dispatch) => {
  const { data } = await api.createPost(newPost);
  dispatch({
    type: CREATE_POST,
    payload: data,
  });
};

export const getPosts = () => async (dispatch: Dispatch) => {
  const { data } = await api.getPosts();
  dispatch({
    type: GET_POSTS,
    payload: data,
  });
};
