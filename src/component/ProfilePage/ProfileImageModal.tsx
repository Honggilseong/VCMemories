import React, { useCallback, useState } from "react";
import Modal from "react-modal";
import { uploadProfileImage } from "../../actions/authAction";
import { useAppDispatch } from "../../reducers/store";
import DropZone from "./ProfileImageModal/DropZone";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
  },
  overlay: { zIndex: 1000 },
};
interface AcceptedFiles {
  path: string;
  preview: string;
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}
function ProfileImageModal({ isModalOpen, setIsModalOpen, authUser }: any) {
  const [previewImage, setPreviewImage] = useState<any>([]);
  const onDrop = useCallback((acceptedFiles: AcceptedFiles[]) => {
    console.log(acceptedFiles);
    setPreviewImage(
      acceptedFiles.map((file: any) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      )
    );
  }, []);
  const dispatch = useAppDispatch();
  const handleUploadProfileImage = async () => {
    if (!previewImage.length) return;
    const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_USERNAME}/upload`;
    const formData = new FormData();
    formData.append("file", previewImage[0]);
    formData.append(
      "upload_preset",
      `${process.env.REACT_APP_CLOUDINARY_NAME}`
    );
    try {
      const response = await fetch(url, {
        method: "post",
        body: formData,
      }).then();
      const data = await response.json();
      dispatch(uploadProfileImage(authUser._id, data.public_id));
      setIsModalOpen(false);
      setPreviewImage([]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPreviewImage([]);
  };
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Comments Modal"
      style={customStyles}
    >
      <DropZone onDrop={onDrop} previewImage={previewImage} />
      <div
        className="flex justify-center items-center p-3 bg-purple-500 rounded-lg text-white mt-3 cursor-pointer"
        onClick={handleUploadProfileImage}
      >
        <p>Upload your profile Image</p>
      </div>
    </Modal>
  );
}

export default ProfileImageModal;
