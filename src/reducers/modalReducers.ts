import {
  OPEN_MODAL,
  CLOSE_MODAL,
  modalActionDispatch,
} from "../actions/modalActionDIspatch";

interface InitialState {
  isModalOpen: boolean;
}
const initialState = {
  isModalOpen: false,
};
const ModalReducer = (
  state: InitialState = initialState,
  action: modalActionDispatch
) => {
  switch (action.type) {
    case OPEN_MODAL: {
      console.log("Modal state has changed");
      return { ...state, isModalOpen: true };
    }
    case CLOSE_MODAL: {
      console.log("Modal state has changed");
      return { ...state, isModalOpen: false };
    }
    default:
      return state;
  }
};
export default ModalReducer;
