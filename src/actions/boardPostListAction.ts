import { Dispatch } from "redux";
import * as api from "../api";
import { toastError } from "../util/toast";
import { GET_BOARDPOST_LIST } from "./boardPostListDispatch";

export const getBoardPostList =
  (page: number, searchWord?: string, category?: string) =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await api.getBoardPostsQuery(page, searchWord, category);
      dispatch({
        type: GET_BOARDPOST_LIST,
        payload: data,
      });
      console.log(data);
    } catch (error: any) {
      console.log(error);
      toastError(error.response.data.message);
    }
  };
