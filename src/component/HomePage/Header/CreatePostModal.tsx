import React from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";

function CreatePostModal() {
  const modal = useSelector((state: RootState) => state.modal);
  return <Modal isOpen={modal.isModalOpen}>CreatePostModal</Modal>;
}

export default CreatePostModal;
