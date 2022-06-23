import {
  OPEN_POST_MODAL,
  CLOSE_MODAL,
  modalActionDispatch,
} from "../actions/modalActionDIspatch";

interface InitialState {
  isPostModalOpen: boolean;
}
const initialState = {
  isPostModalOpen: false,
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
    case CLOSE_MODAL: {
      console.log("Modal state has changed");
      return { ...state, isPostModalOpen: false };
    }
    default:
      return state;
  }
};
export default ModalReducer;
