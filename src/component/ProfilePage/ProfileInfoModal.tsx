import { Image } from "cloudinary-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Comment } from "../../actions/postActionDispatch";
import { RootState } from "../../reducers/store";
import { v4 as uuidv4 } from "uuid";
import Modal from "react-modal";
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
  handleDeletePost,
  handleLeaveComment,
  commentValue,
  handleValueComment,
  handleLikePost,
  handleDeleteUserComment,
  handleClickHashtag,
  handleClickEditPost,
  isEdit,
  handleEditValueTitleMessage,
  editTextValue,
  handleCloseModal,
  handleClickUpdatePost,
}: any) {
  const [likedPost, setLikedPost] = useState<boolean>(false);
  const authUser = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const likedPost = post.likes.findIndex((id: string) => id === authUser._id);
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
      <div className="lg:h-[750px] w-full h-[500px] overflow-auto">
        <div className="h-14 border flex justify-between items-center px-3">
          <div />
          <h1 className="font-bold">{post.name}</h1>
          <div />
        </div>
        <div className="h-[450px] lg:w-[800px] w-full">
          <Image
            key={post.picture}
            cloudName={process.env.REACT_APP_CLOUDINARY_USERNAME}
            publicId={post.picture}
            className="w-full h-full"
            crop="scale"
          />
        </div>
        <div className="my-2">
          {isEdit ? (
            <div className="h-11 mx-1 mt-2 flex justify-center items-center outline-1 outline outline-purple-500 focus-within:outline-2 rounded-lg p-1">
              <input
                name="title"
                type="text"
                className="w-full h-full rounded-lg outline-none"
                placeholder="Title"
                value={editTextValue.title}
                onChange={(event) => handleEditValueTitleMessage(event)}
              />
            </div>
          ) : (
            <h2 className="font-bold text-lg">{post.title}</h2>
          )}

          {isEdit ? (
            <div className="h-11 mx-1 mt-2 flex justify-center items-center outline-1 outline outline-purple-500 focus-within:outline-2 rounded-lg p-1">
              <input
                name="message"
                type="text"
                placeholder="Message"
                className="w-full h-full rounded-lg outline-none"
                value={editTextValue.message}
                onChange={(event) => handleEditValueTitleMessage(event)}
              />
            </div>
          ) : (
            <p>
              {post.message.split(" ").map((msg: string) => {
                if (msg.startsWith("#")) {
                  return (
                    <span
                      key={uuidv4()}
                      className="cursor-pointer text-blue-500"
                      onClick={() => handleClickHashtag(msg)}
                    >
                      {msg}{" "}
                    </span>
                  );
                } else {
                  return msg + " ";
                }
              })}
            </p>
          )}

          <div className="flex justify-between">
            <div className="flex">
              <p className="text-gray-500 text-sm mr-1">
                {moment(post.createdAt).fromNow()}
              </p>
              {post.isEdit && <p className="text-gray-500 text-sm">(edited)</p>}
            </div>
            {post.userId === authUser._id && (
              <div className="flex">
                <div className="px-2">
                  <p
                    className="text-gray-500 text-sm cursor-pointer underline hover:text-gray-700"
                    onClick={handleClickEditPost}
                  >
                    {isEdit ? "Cancel" : "Edit"}
                  </p>
                </div>
                {isEdit && (
                  <div className="px-2" onClick={handleClickUpdatePost}>
                    <p
                      className="text-green-500 text-sm cursor-pointer underline hover:text-green-700"
                      onClick={handleClickEditPost}
                    >
                      Update
                    </p>
                  </div>
                )}
                <div className="px-2" onClick={handleDeletePost}>
                  <p className="text-gray-500 text-sm cursor-pointer underline hover:text-gray-700">
                    Delete
                  </p>
                </div>
              </div>
            )}
          </div>
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
          <div className="flex-[0.5] justify-center flex items-center h-14 border cursor-pointer">
            <AiOutlineComment size={30} />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <form
          className="flex p-1 border border-purple-500"
          onSubmit={handleLeaveComment}
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
          {post.comments.length ? (
            post.comments.map((comment: Comment) => (
              <div
                key={comment._id}
                className="group flex justify-between py-[1px] px-1 items-center"
              >
                <div className="flex">
                  <p className="font-bold mr-2">{comment.commentUserName}:</p>
                  <p>{comment.comment}</p>
                </div>
                {comment.commentUserId === authUser._id && (
                  <div
                    className="flex text-sm cursor-pointer group-hover:opacity-100 opacity-0 text-gray-500"
                    onClick={() =>
                      handleDeleteUserComment(post._id, comment._id)
                    }
                  >
                    <p className="font-bold">X</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="h-20 flex justify-center items-center">
              <p>No comments yet</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default ProfileInfoModal;
