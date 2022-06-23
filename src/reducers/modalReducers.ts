import {
  OPEN_POST_MODAL,
  OPEN_SEARCH_RESULTS_MODAL,
  CLOSE_POST_MODAL,
  modalActionDispatch,
  CLOSE_SEARCH_RESULTS_MODAL,
} from "../actions/modalActionDIspatch";

interface InitialState {
  isPostModalOpen: boolean;
  isSearchResultsModalOpen: boolean;
}
const initialState = {
  isPostModalOpen: false,
  isSearchResultsModalOpen: false,
};
const ModalReducer = (
  state: InitialState = initialState,
  action: modalActionDispatch
) => {
  switch (action.type) {
    case OPEN_POST_MODAL: {
      console.log("Modal state has changed");
      return { ...state, isPostModalOpen: true };
    }
    case CLOSE_POST_MODAL: {
      console.log("Modal state has changed");
      return { ...state, isPostModalOpen: false };
    }
    case OPEN_SEARCH_RESULTS_MODAL: {
      return { ...state, isSearchResultsModalOpen: true };
    }
    case CLOSE_SEARCH_RESULTS_MODAL: {
      return { ...state, isSearchResultsModalOpen: false };
    }
    default:
      return state;
  }
};
export default ModalReducer;
