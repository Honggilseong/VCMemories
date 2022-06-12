import React from "react";
import Routes from "./pages/Routes";
import Modal from "react-modal";
import CreatePostModal from "./component/HomePage/Header/CreatePostModal";

Modal.setAppElement("#root");
function App() {
  return (
    <div>
      <Routes />
      <CreatePostModal />
    </div>
  );
}

export default App;
