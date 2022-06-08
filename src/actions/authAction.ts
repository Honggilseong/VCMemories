import { Dispatch } from "redux";
import { CREATE_USER } from "./authActionDispatch";

export const createUser = () => (dispatch: Dispatch) => {
  dispatch({
    type: CREATE_USER,
  });
};
