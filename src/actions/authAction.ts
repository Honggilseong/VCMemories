import { Dispatch } from "redux";
import { CREATE_USER, SIGN_IN, UserInfo } from "./authActionDispatch";
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
