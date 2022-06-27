import { Dispatch } from "redux";
import {
  Comment,
  CREATE_POST,
  DELETE_POST,
  GET_POSTS,
  LEAVE_COMMENT,
  LIKE_POST,
  NewPost,
} from "./postActionDispatch";
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

export const deletePost =
  (id: string, userId: string) => async (dispatch: Dispatch) => {
    try {
      await api.deletePost(id, userId);
      dispatch({
        type: DELETE_POST,
        payload: id,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const likePost =
  (id: string, userId: string) => async (dispatch: Dispatch) => {
    try {
      const { data } = await api.likePost(id, userId);
      dispatch({
        type: LIKE_POST,
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const leaveComment =
  (id: string, comment: Comment) => async (dispatch: Dispatch) => {
    try {
      const { data } = await api.leaveComment(id, comment);
      dispatch({
        type: LEAVE_COMMENT,
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };
