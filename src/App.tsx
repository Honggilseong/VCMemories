import React, { useEffect } from "react";
import Routes from "./pages/Routes";
import Modal from "react-modal";
import CreatePostModal from "./component/HomePage/Header/CreatePostModal";
import * as analytics from "./util/ga4";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "./reducers/store";
import { closeSearchResultsModal } from "./actions/modalAction";
import { useSelector } from "react-redux";
import { RootState } from "./reducers";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
Modal.setAppElement("#root");

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const modal = useSelector((state: RootState) => state.modal);
  const handleCloseModals = () => {
    if (modal.isSearchResultsModalOpen) dispatch(closeSearchResultsModal());
  };
  useEffect(() => {
    analytics.init();
  }, []);
  useEffect(() => {
    const path = location.pathname + location.search;
    analytics.sendPageview(path);
  }, [location]);
  return (
    <div onClick={handleCloseModals}>
      <Routes />
      <CreatePostModal />
      <ToastContainer />
    </div>
  );
}

export default App;
