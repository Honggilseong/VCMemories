import React, { useEffect } from "react";
import Routes from "./pages/Routes";
import Modal from "react-modal";
import CreatePostModal from "./component/HomePage/Header/CreatePostModal";
import ReactGA from "react-ga4";
import { useAppDispatch } from "./reducers/store";
import { closeSearchResultsModal } from "./actions/modalAction";
import { useSelector } from "react-redux";
import { RootState } from "./reducers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
Modal.setAppElement("#root");

function App() {
  const dispatch = useAppDispatch();
  const modal = useSelector((state: RootState) => state.modal);
  const handleCloseModals = () => {
    if (modal.isSearchResultsModalOpen) dispatch(closeSearchResultsModal());
  };
  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_TRACKING_ID || "");
  }, []);
  return (
    <div onClick={handleCloseModals}>
      <Routes />
      <CreatePostModal />
      <ToastContainer />
    </div>
  );
}

export default App;
