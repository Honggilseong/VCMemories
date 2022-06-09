import { Dispatch } from "redux";
import { CREATE_USER, UserInfo } from "./authActionDispatch";
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
