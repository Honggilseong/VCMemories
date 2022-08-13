import { Dispatch } from "redux";
import {
  Comment,
  CREATE_POST,
  POST_DELETE_POST,
  GET_POSTS,
  POST_LEAVE_COMMENT,
  POST_LIKE_POST,
  NewPost,
  RESET_POSTS,
  POST_DELETE_COMMENT,
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
        type: POST_DELETE_POST,
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
      if (userId !== postUserId) {
        api.sendNotification(postUserId, {
          sender: senderName,
          notificationType: "liked your Post",
          image,
        });
      }
      dispatch({
        type: POST_LIKE_POST,
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
        type: POST_LEAVE_COMMENT,
        payload: data,
      });
      if (comment.commentUserId !== postUserId) {
        console.log("send notification");
        api.sendNotification(postUserId, {
          sender: senderName,
          notificationType: "Left a comment",
          image,
        });
      }
      toastSuccess("Your comment has been left successfully 😀");
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

export const deleteUserComment =
  (postId: string, commentId: string) => async (dispatch: Dispatch) => {
    const IDs = {
      postId,
      commentId,
    };
    try {
      await api.deleteUserComment(postId, commentId);
      dispatch({ type: POST_DELETE_COMMENT, payload: IDs });
      toastSuccess("Deleted your comment!");
    } catch (err) {
      console.log(err);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };
