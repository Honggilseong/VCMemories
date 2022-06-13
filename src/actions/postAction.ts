import { Dispatch } from "redux";
import { CREATE_POST } from "./postActionDispatch";

export const createPost = () => (dispatch: Dispatch) => {
  dispatch({
    type: CREATE_POST,
  });
};
