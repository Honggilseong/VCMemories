import { Dispatch } from "redux";
import { CLOSE_MODAL, OPEN_MODAL } from "./modalActionDIspatch";

export const openModal = () => (dispatch: Dispatch) => {
  dispatch({
    type: OPEN_MODAL,
  });
};
export const closeModal = () => (dispatch: Dispatch) => {
  dispatch({
    type: CLOSE_MODAL,
  });
};
