import { Image } from "cloudinary-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import Modal from "react-modal";
import { Comment } from "../../../../actions/postActionDispatch";
import { v4 as uuidv4 } from "uuid";
import { Mention, MentionItem, MentionsInput } from "react-mentions";
import { mentionInputStyle, mentionStyle } from "../../../../util/mentionCSS";
import { useSelector } from "react-redux";
import { RootState } from "../../../../reducers/store";
import CloudinaryImage from "../../../CommonComponents/CloudinaryImage";
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
  handleValueComment: (
    event: any,
    newValue: string,
    newPlainTextValue: string,
    mentions: MentionItem[]
  ) => void;
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
  handleDeleteUserComment: (postId: string, commentId: string) => void;
  handleClickUserMention: (username: string) => void;
  handleClickHashtag: (hashtag: string) => void;
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
  handleDeleteUserComment,
  handleClickUserMention,
  handleClickHashtag,
}: Props) {
  const [likedPost, setLikedPost] = useState<boolean>(false);
  const allUsers = useSelector((state: RootState) => state.allUsers);
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
        <div className="lg:h-[750px] w-full h-[500px] overflow-auto">
          <div className="h-14 border flex justify-between items-center px-3">
            <div />
            <h1 className="font-bold">{modalPost.name}</h1>

            <div />
          </div>
          <div className="h-[450px] lg:w-[800px] w-full">
            <CloudinaryImage image={modalPost.picture} />
          </div>
          <div className="my-2">
            <h2 className="font-bold text-lg">{modalPost.title}</h2>
            <p>
              {" "}
              {modalPost.message.split(" ").map((msg: string) => {
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
              <MentionsInput
                value={commentValue.comment}
                onChange={(event, newValue, newPlainTextValue, mentions) =>
                  handleValueComment(
                    event,
                    newValue,
                    newPlainTextValue,
                    mentions
                  )
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
            {modalPost.comments.length ? (
              modalPost.comments.map((comment: Comment) => (
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
                      onClick={() =>
                        handleDeleteUserComment(modalPost._id, comment._id)
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
      ) : (
        <p>Loading...</p>
      )}
    </Modal>
  );
}

export default UserPostModal;
