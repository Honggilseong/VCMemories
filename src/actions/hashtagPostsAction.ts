import { Dispatch } from "redux";
import * as api from "../api";
import { toastError, toastSuccess } from "../util/toast";
import {
  Comment,
  GET_HASHTAG_POSTS,
  HASHTAG_DELETE_COMMENT,
  HASHTAG_LEAVE_COMMENT,
  HASHTAG_LIKE_POST,
} from "./hashtagPostsDispatch";

export const getHashtagPosts =
  (hashtag: string) => async (dispatch: Dispatch) => {
    try {
      const { data } = await api.getHashtagPosts(hashtag);

      dispatch({
        type: GET_HASHTAG_POSTS,
        payload: data,
      });
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
        type: HASHTAG_LIKE_POST,
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
        type: HASHTAG_LEAVE_COMMENT,
        payload: data,
      });
      if (comment.commentUserId !== postUserId) {
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

export const deleteUserComment =
  (postId: string, commentId: string) => async (dispatch: Dispatch) => {
    const IDs = {
      postId,
      commentId,
    };
    try {
      await api.deleteUserComment(postId, commentId);
      dispatch({ type: HASHTAG_DELETE_COMMENT, payload: IDs });
      toastSuccess("Deleted your comment!");
    } catch (err) {
      console.log(err);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };
