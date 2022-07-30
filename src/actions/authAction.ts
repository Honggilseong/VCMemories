import { Dispatch } from "redux";
import {
  CREATE_USER,
  DELETE_NOTIFICATIONS,
  DELETE_POST,
  GET_USER_INFO,
  LEAVE_COMMENT,
  LIKE_POST,
  READ_NOTIFICATIONS,
  SIGN_IN,
  SIGN_OUT,
  UPLOAD_PROFILE_IMAGE,
  UserInfo,
} from "./authActionDispatch";
import * as api from "../api";
import { Comment } from "./postActionDispatch";
import { toastError, toastSuccess } from "../util/toast";

export const createUser =
  (userInfo: UserInfo, navigate: any) => async (dispatch: Dispatch) => {
    try {
      const { data } = await api.signUp(userInfo);
      dispatch({
        type: CREATE_USER,
        payload: data,
      });
      console.log(data);
      const userData = await api.getUserInfo(data.user._id);
      dispatch({
        type: GET_USER_INFO,
        payload: userData.data,
      });
      navigate("/");
    } catch (error: any) {
      console.log(error);
      toastError(error.response.data.message);
    }
  };
export const signIn =
  (userInfo: UserInfo, navigate: any) => async (dispatch: Dispatch) => {
    try {
      const { data } = await api.signIn(userInfo);
      dispatch({
        type: SIGN_IN,
        payload: data,
      });
      console.log(data);
      const userData = await api.getUserInfo(data.user._id);
      dispatch({
        type: GET_USER_INFO,
        payload: userData.data,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toastError("Your email or password is wrong... please try again...");
    }
  };
export const signOut = () => (dispatch: Dispatch) => {
  dispatch({
    type: SIGN_OUT,
  });
};

export const getUserInfo = (id: string) => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.getUserInfo(id);
    dispatch({
      type: GET_USER_INFO,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    toastError("Sorry something went wrong... please try again... 😢");
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

export const uploadProfileImage =
  (id: string, uploadImage: string) => async (dispatch: Dispatch) => {
    try {
      await api.uploadProfileImage(id, uploadImage);
      dispatch({
        type: UPLOAD_PROFILE_IMAGE,
        payload: uploadImage,
      });
      toastSuccess("Your image has been uploaded successfully 😀");
    } catch (error) {
      console.log(error);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };

export const readNotifications = (id: string) => async (dispatch: Dispatch) => {
  try {
    await api.readNotification(id);
    dispatch({
      type: READ_NOTIFICATIONS,
    });
  } catch (error) {
    console.log(error);
    toastError("Sorry something went wrong... please try again... 😢");
  }
};

export const deleteNotifications =
  (id: string) => async (dispatch: Dispatch) => {
    try {
      await api.deleteNotifications(id);
      dispatch({
        type: DELETE_NOTIFICATIONS,
      });
    } catch (error) {
      console.log(error);
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
