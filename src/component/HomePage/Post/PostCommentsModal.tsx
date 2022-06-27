import React from "react";
import Modal from "react-modal";
import { Comment } from "../../../actions/postActionDispatch";
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
  commentValue: Comment;
  isCommentsOpen: boolean;
  comments: Comment[];
}
function PostCommentsModal({
  setIsCommentsOpen,
  handleInputComment,
  handleLeaveComment,
  isCommentsOpen,
  commentValue,
  comments,
}: Props) {
  const getUser = JSON.parse(localStorage.getItem("profile") || "");
  const handleCloseModal = () => {
    setIsCommentsOpen(false);
  };
  return (
    <Modal
      isOpen={isCommentsOpen}
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
                value={commentValue.comment}
              />
            </div>
            <button
              disabled={commentValue.comment ? false : true}
              className={`p-2 rounded-lg text-white self-end ${
                commentValue.comment ? "bg-purple-500" : "bg-gray-400"
              }`}
              type="submit"
            >
              Comment
            </button>
          </form>
        </div>
        <div className="h-[300px] overflow-y-scroll">
          {comments.length ? (
            comments.map((comment) => (
              <div className="overflow-hidden" key={comment._id}>
                <p className="font-bold">
                  {comment.commentUserName}:{" "}
                  <span className="font-normal">{comment.comment}</span>
                </p>
              </div>
            ))
          ) : (
            <div className="h-[300px] border flex items-center justify-center">
              no comments
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default PostCommentsModal;
