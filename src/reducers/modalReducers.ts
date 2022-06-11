import { modalActionDispatch } from "../actions/modalActionDIspatch";
import { OPEN_MODAL } from "../actions/modalActionDIspatch";

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
      return { ...state, isModalOpen: !state.isModalOpen };
    }
    default:
      return state;
  }
};
export default ModalReducer;
