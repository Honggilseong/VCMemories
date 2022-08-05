import { Image } from "cloudinary-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "react-modal";
import { Comment } from "../../../../actions/postActionDispatch";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
interface Props {
  isUserPostModalOpen: boolean;
  handleCloseModal: () => void;
  modalPost: any;
  handleValueComment: (event: React.ChangeEvent<HTMLInputElement>) => void;
  commentValue: Comment;
  handleLikePost: (
    postId: string,
    postUserId: string,
    postPicture: string
  ) => void;
  authUser: any;
  handleLeaveComment: (
    event: React.FormEvent<EventTarget>,
    postId: string,
    postUserId: string,
    postPicture: string
  ) => void;
}
function UserPostModal({
  isUserPostModalOpen,
  handleCloseModal,
  modalPost,
  handleValueComment,
  commentValue,
  handleLikePost,
  authUser,
  handleLeaveComment,
}: Props) {
  const [likedPost, setLikedPost] = useState<boolean>(false);
  useEffect(() => {
    if (!modalPost) return;
    const likedPost = modalPost?.likes.findIndex(
      (id: string) => id === authUser._id
    );
    if (likedPost === -1) {
      setLikedPost(false);
    } else {
      setLikedPost(true);
    }
  }, [modalPost?.likes]);
  return (
    <Modal
      isOpen={isUserPostModalOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Example Modal"
      style={customStyles}
    >
      {modalPost ? (
        <div className="h-[750px] overflow-auto">
          <div className="h-14 border flex justify-between items-center px-3">
            <div />
            <h1 className="font-bold">{modalPost.name}</h1>

            <div />
          </div>
          <div className="h-[450px] w-[800px]">
            <Image
              key={modalPost.picture}
              cloudName={process.env.REACT_APP_CLOUDINARY_USERNAME}
              publicId={modalPost.picture}
              className="w-full h-full"
              crop="scale"
            />
          </div>
          <div className="my-2">
            <h2 className="font-bold text-lg">{modalPost.title}</h2>
            <p>{modalPost.message}</p>
            {/* <p>{modalPost.tags.map((tag: string) => tag)}</p> */}
            <p className="text-gray-500 text-sm">
              {moment(modalPost.createdAt).fromNow()}
            </p>
          </div>
          <div className="flex">
            <div
              className="flex-[0.5] justify-center flex items-center h-14 border cursor-pointer"
              onClick={() =>
                handleLikePost(
                  modalPost._id,
                  modalPost.userId,
                  modalPost.picture
                )
              }
            >
              {likedPost ? (
                <AiFillHeart size={30} color="red" />
              ) : (
                <AiOutlineHeart size={30} />
              )}

              <span>{modalPost.likes.length}</span>
            </div>
            <div className="flex-[0.5] justify-center flex items-center h-14 border cursor-pointer">
              <AiOutlineComment size={30} />
              <span>{modalPost.comments.length}</span>
            </div>
          </div>
          <form
            className="flex p-1 border border-purple-500"
            onSubmit={(event) =>
              handleLeaveComment(
                event,
                modalPost._id,
                modalPost.userId,
                modalPost.picture
              )
            }
          >
            <div className="flex-1">
              <input
                type="text"
                placeholder="Add a comment"
                className="h-full w-full focus:outline-none"
                value={commentValue.comment}
                onChange={handleValueComment}
              />
            </div>
            <button
              type="submit"
              className={`p-2 bg-purple-500 text-white rounded-lg ml-1 ${
                commentValue ? "bg-purple-500" : "bg-gray-400"
              }`}
              disabled={commentValue ? false : true}
            >
              Comment
            </button>
          </form>
          <div className="my-3">
            {modalPost.comments.length ? (
              modalPost.comments.map((comment: Comment) => (
                <div key={comment._id} className="flex">
                  <p className="font-bold mr-2">{comment.commentUserName}:</p>
                  <p>{comment.comment}</p>
                </div>
              ))
            ) : (
              <div className="h-20 flex justify-center items-center">
                <p>No comments yet</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Modal>
  );
}

export default UserPostModal;
