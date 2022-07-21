import { toastSuccess, toastError } from "./../util/toast";
import { Dispatch } from "redux";
import * as api from "../api";
import { Comment } from "./postActionDispatch";
import {
  FOLLOW_USER,
  LEAVE_COMMENT,
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
  (id: string, comment: Comment) => async (dispatch: Dispatch) => {
    try {
      const { data } = await api.leaveComment(id, comment);
      dispatch({
        type: LEAVE_COMMENT,
        payload: data,
      });
      toastSuccess("Success! 😀");
    } catch (err) {
      console.log(err);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };
