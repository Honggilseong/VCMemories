import { toastSuccess, toastError } from "./../util/toast";
import { Dispatch } from "redux";
import * as api from "../api";
import { Comment } from "./postActionDispatch";
import {
  FOLLOW_USER,
  LEAVE_COMMENT,
  LIKE_POST,
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
      toastSuccess("Now, you are following this user! 😀");
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
        type: LIKE_POST,
        payload: data,
      });
    } catch (err) {
      console.log(err);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };
