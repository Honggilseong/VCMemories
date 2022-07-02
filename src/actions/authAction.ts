import { Dispatch } from "redux";
import {
  CREATE_USER,
  DELETE_POST,
  GET_USER_INFO,
  SIGN_IN,
  UserInfo,
} from "./authActionDispatch";
import * as api from "../api";

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
