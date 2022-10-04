import { Dispatch } from "redux";
import { StringMappingType } from "typescript";
import * as api from "../api";
import { toastError, toastSuccess } from "../util/toast";
import {
  BOARDPOST_DELETE_COMMENT,
  BOARDPOST_DELETE_REPLY,
  BOARDPOST_EDIT_COMMENT,
  BOARDPOST_EDIT_REPLY,
  BOARDPOST_LEAVE_COMMENT,
  BOARDPOST_LEAVE_REPLY,
  BOARDPOST_LIKE,
  BOARDPOST_LIKE_COMMENT,
  BOARDPOST_LIKE_REPLY,
  Comment,
  GET_BOARDPOST,
  Reply,
} from "./boardPostDispatch";

export const getBoardPost = (id: string) => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.getBoardPost(id);
    dispatch({
      type: GET_BOARDPOST,
      payload: data,
    });
  } catch (error: any) {
    console.log(error);
    toastError(error.response.data.message);
  }
};
export const leaveBoardPostComment =
  (boardPostId: string, comment: Comment) => async (dispatch: Dispatch) => {
    try {
      const { data } = await api.leaveBoardPostComment(boardPostId, comment);
      dispatch({
        type: BOARDPOST_LEAVE_COMMENT,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };

export const boardPostLeaveReply =
  (boardPostId: string, reply: Reply, commentId: string) =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await api.leaveBoardPostReply(
        boardPostId,
        reply,
        commentId
      );
      dispatch({
        type: BOARDPOST_LEAVE_REPLY,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };

export const likeBoardPost =
  (boardPostId: string, userId: string) => async (dispatch: Dispatch) => {
    try {
      const { data } = await api.likeBoardPost(boardPostId, userId);
      dispatch({
        type: BOARDPOST_LIKE,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };

export const likeBoardPostComment =
  (boardPostId: string, userId: string, commentId: string) =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await api.likeBoardPostComment(
        boardPostId,
        userId,
        commentId
      );
      dispatch({
        type: BOARDPOST_LIKE_COMMENT,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };

export const likeBoardPostReply =
  (boardPostId: string, userId: string, commentId: string, replyId: string) =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await api.likeBoardPostReply(
        boardPostId,
        userId,
        commentId,
        replyId
      );
      dispatch({
        type: BOARDPOST_LIKE_REPLY,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };

export const deleteBoardPost =
  (boardPostId: string, userId: string) => async (dispatch: Dispatch) => {
    try {
      await api.deleteBoardPost(boardPostId, userId);
      toastSuccess("Deleted your post!");
    } catch (error: any) {
      console.log(error);
      toastError(error.response.data.message);
    }
  };

export const deleteBoardPostComment =
  (boardPostId: string, userId: string, commentId: string) =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await api.deleteBoardPostComment(
        boardPostId,
        userId,
        commentId
      );
      dispatch({
        type: BOARDPOST_DELETE_COMMENT,
        payload: data,
      });
      toastSuccess("Deleted your comment!");
    } catch (error) {
      console.log(error);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };

export const deleteBoardPostReply =
  (boardPostId: string, userId: string, commentId: string, replyId: string) =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await api.deleteBoardPostReply(
        boardPostId,
        userId,
        commentId,
        replyId
      );
      dispatch({
        type: BOARDPOST_DELETE_REPLY,
        payload: data,
      });

      toastSuccess("Deleted your comment!");
    } catch (error) {
      console.log(error);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };

export const editBoardPostComment =
  (boardPostId: string, commentId: string, editComment: string) =>
  async (dispatch: Dispatch) => {
    try {
      await api.editBoardPostComment(boardPostId, commentId, editComment);
      dispatch({
        type: BOARDPOST_EDIT_COMMENT,
        payload: { commentId, editComment },
      });
      toastSuccess("Updated your comment");
    } catch (error) {
      console.log(error);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };

export const editBoardPostReply =
  (
    boardPostId: string,
    commentId: string,
    replyId: string,
    editComment: string
  ) =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await api.editBoardPostReply(
        boardPostId,
        commentId,
        replyId,
        editComment
      );
      dispatch({
        type: BOARDPOST_EDIT_REPLY,
        payload: data,
      });

      toastSuccess("Deleted your comment!");
    } catch (error) {
      console.log(error);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };
