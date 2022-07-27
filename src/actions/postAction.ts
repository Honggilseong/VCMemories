import { Dispatch } from "redux";
import {
  Comment,
  CREATE_POST,
  DELETE_POST,
  GET_POSTS,
  LEAVE_COMMENT,
  LIKE_POST,
  NewPost,
  RESET_POSTS,
} from "./postActionDispatch";
import * as api from "../api";
import { toastError, toastSuccess } from "../util/toast";

export const createPost = (newPost: NewPost) => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.createPost(newPost);

    dispatch({
      type: CREATE_POST,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    toastError("Sorry something went wrong... please try again... 😢");
  }
};

export const getPosts =
  (followingUsers: string[]) => async (dispatch: Dispatch) => {
    try {
      const { data } = await api.getPosts(followingUsers);
      dispatch({
        type: GET_POSTS,
        payload: data,
      });
    } catch (err) {
      console.log(err);
      toastError("Sorry we couldn't get the posts please try again... 😢");
    }
  };

export const deletePost =
  (id: string, userId: string) => async (dispatch: Dispatch) => {
    try {
      await api.deletePost(id, userId);
      dispatch({
        type: DELETE_POST,
        payload: id,
      });
      toastSuccess("Success! 😀");
    } catch (err) {
      console.log(err);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };

export const likePost =
  (
    id: string,
    userId: string,
    postUserId: string,
    senderName: string,
    image: string
  ) =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await api.likePost(id, userId);
      api.sendNotification(postUserId, {
        sender: senderName,
        notificationType: "liked your Post",
        image,
      });
      dispatch({
        type: LIKE_POST,
        payload: data,
      });
    } catch (err) {
      console.log(err);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };

export const leaveComment =
  (
    id: string,
    comment: Comment,
    postUserId: string,
    senderName: string,
    image: string
  ) =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await api.leaveComment(id, comment);
      dispatch({
        type: LEAVE_COMMENT,
        payload: data,
      });
      api.sendNotification(postUserId, {
        sender: senderName,
        notificationType: "Left a comment",
        image,
      });
      toastSuccess("Success! 😀");
    } catch (err) {
      console.log(err);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };

export const resetPosts = () => (dispatch: Dispatch) => {
  dispatch({
    type: RESET_POSTS,
  });
};
