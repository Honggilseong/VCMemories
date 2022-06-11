import { Dispatch } from "redux";
import { OPEN_MODAL } from "./modalActionDIspatch";

export const openModal = () => (dispatch: Dispatch) => {
  dispatch({
    type: OPEN_MODAL,
  });
};
