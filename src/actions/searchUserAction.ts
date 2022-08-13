import { toastSuccess, toastError } from "./../util/toast";
import { Dispatch } from "redux";
import * as api from "../api";
import { Comment } from "./postActionDispatch";
import {
  FOLLOW_USER,
  SEARCH_DELETE_COMMENT,
  SEARCH_LEAVE_COMMENT,
  SEARCH_LIKE_POST,
  SEARCH_USER,
} from "./searchUserActionDispatch";

export const getSearchingUser =
  (username: string | undefined) => async (dispatch: Dispatch) => {
    try {
      const { data } = await api.getSearchingUser(username);
      dispatch({
        type: SEARCH_USER,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };

export const followUser =
  (id: string, userId: string) => async (dispatch: Dispatch) => {
    try {
      const { data } = await api.followUser(id, userId);
      dispatch({
        type: FOLLOW_USER,
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
        type: SEARCH_LEAVE_COMMENT,
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
        type: SEARCH_LIKE_POST,
        payload: data,
      });
    } catch (err) {
      console.log(err);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };

export const deleteUserComment =
  (postId: string, commentId: string) => async (dispatch: Dispatch) => {
    const IDs = {
      postId,
      commentId,
    };
    try {
      await api.deleteUserComment(postId, commentId);
      dispatch({ type: SEARCH_DELETE_COMMENT, payload: IDs });
      toastSuccess("Deleted your comment!");
    } catch (err) {
      console.log(err);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };
