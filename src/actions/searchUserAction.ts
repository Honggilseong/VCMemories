import { Dispatch } from "redux";
import * as api from "../api";
import { FOLLOW_USER, SEARCH_USER } from "./searchUserActionDispatch";

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
    } catch (error) {
      console.log(error);
    }
  };
