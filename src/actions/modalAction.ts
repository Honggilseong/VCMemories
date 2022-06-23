import { Dispatch } from "redux";
import { CLOSE_MODAL, OPEN_POST_MODAL } from "./modalActionDIspatch";

export const openPostModal = () => (dispatch: Dispatch) => {
  dispatch({
    type: OPEN_POST_MODAL,
  });
};
export const closeModal = () => (dispatch: Dispatch) => {
  dispatch({
    type: CLOSE_MODAL,
  });
};
