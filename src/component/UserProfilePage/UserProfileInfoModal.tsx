import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modal from "react-modal";
import { Comment } from "../../actions/postActionDispatch";
import { v4 as uuidv4 } from "uuid";
import { Mention, MentionsInput } from "react-mentions";
import { mentionInputStyle, mentionStyle } from "../../util/mentionCSS";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/store";
import CloudinaryImage from "../CommonComponents/CloudinaryImage";
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
function UserProfileInfoModal({
  post,
  isModalOpen,
  isPostInfoOpen,
  handleClickPostInfo,
  handleLeaveComment,
  commentValue,
  handleValueComment,
  handleCloseModal,
  authUser,
  handleLikePost,
  handleDeleteUserComment,
  handleClickHashtag,
  handleClickUserMention,
}: any) {
  const [likedPost, setLikedPost] = useState<boolean>(false);
  const allUsers = useSelector((state: RootState) => state.allUsers);
  useEffect(() => {
    const isLiked = post.likes.findIndex((id: string) => id === authUser._id);
    if (isLiked === -1) {
      setLikedPost(false);
    } else {
      setLikedPost(true);
    }
  }, [post.likes]);
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Search User Post Modal"
      style={customStyles}
    >
      <div className="lg:h-[750px] w-full h-[500px] overflow-auto scrollbar-hide">
        <div className="h-14 border flex justify-between items-center px-3">
          <div />
          <h1 className="font-bold">{post.name}</h1>

          <div
            className="cursor-pointer hover:bg-slate-300 rounded-full h-7 w-7 flex justify-center items-center relative"
            onClick={handleClickPostInfo}
          >
            <BsThreeDotsVertical size={20} />
            {isPostInfoOpen && (
              <div className="absolute -left-2 border bg-white p-2 -bottom-10">
                <p>Report</p>
              </div>
            )}
          </div>
        </div>
        <div className="h-[450px] lg:w-[800px] w-full">
          <CloudinaryImage image={post.picture} />
        </div>
        <div className="my-2">
          <h2 className="font-bold text-lg">{post.title}</h2>
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
          <p>{post.tags.map((tag: string) => tag)}</p>
          <p className="text-gray-500 text-sm">
            {moment(post.createdAt).fromNow()}
          </p>
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
            <MentionsInput
              value={commentValue.comment}
              onChange={(event, newValue, newPlainTextValue, mentions) =>
                handleValueComment(event, newValue, newPlainTextValue, mentions)
              }
              className="w-full h-full"
              style={mentionInputStyle}
              placeholder="Add a comment"
            >
              <Mention
                trigger="@"
                data={allUsers.map((user) => ({
                  id: user._id,
                  display: user.name,
                }))}
                appendSpaceOnAdd
                style={mentionStyle}
                displayTransform={(id, display) => {
                  return `@${display}`;
                }}
              />
            </MentionsInput>
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
                  <p>
                    {comment.comment.split(" ").map((msg) => {
                      if (msg.startsWith("@")) {
                        return (
                          <span
                            key={uuidv4()}
                            className="cursor-pointer text-blue-500 font-bold"
                            onClick={() => handleClickUserMention(msg)}
                          >
                            {msg}{" "}
                          </span>
                        );
                      } else {
                        return msg + " ";
                      }
                    })}
                  </p>
                </div>
                {comment.commentUserId === authUser._id && (
                  <div
                    className="flex text-sm cursor-pointer group-hover:opacity-100 opacity-0 text-gray-500"
                    onClick={() => handleDeleteUserComment(comment._id)}
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

export default UserProfileInfoModal;
