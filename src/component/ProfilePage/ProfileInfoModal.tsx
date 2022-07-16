import { Image } from "cloudinary-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "react-modal";
import { likePost } from "../../actions/postAction";
import { Comment } from "../../actions/postActionDispatch";
import { useAppDispatch } from "../../reducers/store";
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
function ProfileInfoModal({
  post,
  isModalOpen,
  setIsModalOpen,
  isPostInfoOpen,
  handleClickPostInfo,
  handleDeletePost,
}: any) {
  const [likedPost, setLikedPost] = useState<boolean>(false);
  const getUser = JSON.parse(localStorage.getItem("profile") || "");
  const dispatch = useAppDispatch();
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleLikePost = () => {
    console.log("liked");
    return;
    dispatch(likePost(post._id, getUser.user._id));
  };
  useEffect(() => {
    const likedPost = post.likes.findIndex(
      (id: string) => id === getUser.user._id
    );
    if (likedPost === -1) {
      setLikedPost(false);
    } else {
      setLikedPost(true);
    }
  }, [post.likes]);
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Example Modal"
      style={customStyles}
    >
      <div className="max-h-[550px]">
        <div className="h-14 border flex justify-between items-center px-3">
          <div />
          <h1>{post.name}</h1>

          <div
            className="cursor-pointer hover:bg-slate-300 rounded-full h-7 w-7 flex justify-center items-center relative"
            onClick={handleClickPostInfo}
          >
            <BsThreeDotsVertical size={20} />
            {isPostInfoOpen && (
              <div className="absolute -left-2 border bg-white p-2 -bottom-10">
                {post.userId === getUser.user._id && (
                  <p className="text-red-600" onClick={handleDeletePost}>
                    Delete
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="h-96 w-96 mx-auto">
          <Image
            key={post.picture}
            cloudName={process.env.REACT_APP_CLOUDINARY_USERNAME}
            publicId={post.picture}
            className="w-full h-full"
            crop="scale"
          />
        </div>
        <div className="my-2">
          <p>{post.message}</p>
          <p>{post.tags.map((tag: string) => tag)}</p>
          <p>{moment(post.createdAt).fromNow()}</p>
        </div>
        <div className="flex">
          <div
            className="flex-[0.5] justify-center flex items-center h-14 border cursor-pointer"
            onClick={handleLikePost}
          >
            {likedPost ? (
              <AiFillHeart size={30} color="red" />
            ) : (
              <AiOutlineHeart size={30} />
            )}

            <span>{post.likes.length}</span>
          </div>
          <div
            className="flex-[0.5] justify-center flex items-center h-14 border cursor-pointer"
            // onClick={handleClickComments}
          >
            <AiOutlineComment size={30} />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className="flex">
          {post.comments.length ? (
            post.comments.map((comment: Comment) => (
              <div className="flex my-3">
                <p className="font-bold mr-2">{comment.commentUserName}:</p>
                <p>{comment.comment}</p>
              </div>
            ))
          ) : (
            <div className="h-20 flex justify-center items-center">
              <p>There's no comments</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default ProfileInfoModal;
