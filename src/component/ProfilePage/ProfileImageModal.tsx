import React, { useCallback, useState } from "react";
import Modal from "react-modal";
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
function ProfileImageModal({ isModalOpen, setIsModalOpen }: any) {
  const [previewImage, setPreviewImage] = useState<any>([]);
  const onDrop = useCallback((acceptedFiles: AcceptedFiles[]) => {
    console.log(acceptedFiles);
    setPreviewImage(
      acceptedFiles.map((file: any) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      )
    );
  }, []);
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
      <div className="flex justify-center items-center p-3 bg-purple-500 rounded-lg text-white mt-3">
        <p>Upload your profile Image</p>
      </div>
    </Modal>
  );
}

export default ProfileImageModal;
