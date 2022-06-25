import React, { useState } from "react";
import Modal from "react-modal";

const mockupData = [
  { id: 1, name: "Mannagh", comment: 0 },
  { id: 2, name: "McCullogh", comment: 0 },
  { id: 3, name: "Swyer-Sexey", comment: 0 },
  { id: 4, name: "Drayton", comment: 0 },
  {
    id: 5,
    name: "Astellffffffffffffffffffffffffffffffffffffffffffff",
    comment: 0,
  },
  { id: 6, name: "Drummond", comment: 0 },
  { id: 7, name: "Gilstoun", comment: 1 },
  { id: 8, name: "Blackesland", comment: 1 },
  { id: 9, name: "Bruhke", comment: 0 },
  { id: 10, name: "Stapells", comment: 1 },
];
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
interface Props {
  setIsCommentsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleInputComment: React.ChangeEventHandler<HTMLInputElement>;
  handleLeaveComment: any;
  commentValue: string;
}
function PostCommentsModal({
  setIsCommentsOpen,
  handleInputComment,
  handleLeaveComment,
  commentValue,
}: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const getUser = JSON.parse(localStorage.getItem("profile") || "");
  const handleCloseModal = () => {
    setIsOpen(false);
    setIsCommentsOpen(false);
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Comments Modal"
      style={customStyles}
    >
      <div className="w-[500px]">
        <div className="flex items-center w-full mb-3">
          <form className="w-full flex flex-col" onSubmit={handleLeaveComment}>
            <div className="flex items-center justify-center mb-3 border border-purple-500 p-2">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img
                  src={getUser.user.profilePicture}
                  alt="userProfilePicture"
                  className="h-10 w-10"
                />
              </div>
              <input
                type="text"
                placeholder="Enter your comment"
                className="w-full p-1 mx-1 focus:outline-none"
                onChange={handleInputComment}
              />
            </div>
            <button
              disabled={commentValue ? true : false}
              className={`p-2 rounded-lg text-white self-end ${
                commentValue ? "bg-purple-500 cursor-pointer" : "bg-gray-400"
              }`}
            >
              Comment
            </button>
          </form>
        </div>
        <div className="max-h-[300px] overflow-y-scroll">
          {mockupData.map((comment) => (
            <div className="overflow-hidden" key={comment.id}>
              <p className="font-bold">
                {comment.name}:{" "}
                <span className="font-normal">{comment.name}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

export default PostCommentsModal;
