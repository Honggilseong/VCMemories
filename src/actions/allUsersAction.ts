import { Dispatch } from "redux";
import * as api from "../api";
import { toastError } from "../util/toast";
import { GET_ALL_USERS } from "./allUsersActionDispatch";

export const getAllUsers = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.getAllUsers();
    dispatch({
      type: GET_ALL_USERS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    toastError("Sorry something went wrong... please try again... 😢");
  }
};
