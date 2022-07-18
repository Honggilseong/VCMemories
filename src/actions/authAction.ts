import { readNotification } from "./../api/index";
import { Dispatch } from "redux";
import {
  CREATE_USER,
  DELETE_NOTIFICATIONS,
  DELETE_POST,
  GET_USER_INFO,
  LEAVE_COMMENT,
  READ_NOTIFICATIONS,
  SIGN_IN,
  UPLOAD_PROFILE_IMAGE,
  UserInfo,
} from "./authActionDispatch";
import * as api from "../api";
import { Comment } from "./postActionDispatch";

export const createUser =
  (userInfo: UserInfo, navigate: any) => async (dispatch: Dispatch) => {
    try {
      const { data } = await api.signUp(userInfo);
      dispatch({
        type: CREATE_USER,
        payload: data,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
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
      navigate("/");
    } catch (error) {
      console.log(error);
    }
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
    } catch (err) {
      console.log(err);
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
    } catch (error) {
      console.log(error);
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
