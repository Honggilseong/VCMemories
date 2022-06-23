import { Dispatch } from "redux";
import {
  CLOSE_POST_MODAL,
  CLOSE_SEARCH_RESULTS_MODAL,
  OPEN_POST_MODAL,
  OPEN_SEARCH_RESULTS_MODAL,
} from "./modalActionDIspatch";

export const openPostModal = () => (dispatch: Dispatch) => {
  dispatch({
    type: OPEN_POST_MODAL,
  });
};
export const closePostModal = () => (dispatch: Dispatch) => {
  dispatch({
    type: CLOSE_POST_MODAL,
  });
};
export const openSearchResultsModal = () => (dispatch: Dispatch) => {
  dispatch({
    type: OPEN_SEARCH_RESULTS_MODAL,
  });
};
export const closeSearchResultsModal = () => (dispatch: Dispatch) => {
  dispatch({
    type: CLOSE_SEARCH_RESULTS_MODAL,
  });
};
