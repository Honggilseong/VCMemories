import React from "react";
import Routes from "./pages/Routes";
import Modal from "react-modal";
import CreatePostModal from "./component/HomePage/Header/CreatePostModal";
import { useAppDispatch } from "./reducers/store";
import { closeSearchResultsModal } from "./actions/modalAction";
import { useSelector } from "react-redux";
import { RootState } from "./reducers";

Modal.setAppElement("#root");
function App() {
  const dispatch = useAppDispatch();
  const modal = useSelector((state: RootState) => state.modal);
  const handleCloseModals = () => {
    if (modal.isSearchResultsModalOpen) dispatch(closeSearchResultsModal());
  };
  return (
    <div onClick={handleCloseModals}>
      <Routes />
      <CreatePostModal />
    </div>
  );
}

export default App;
