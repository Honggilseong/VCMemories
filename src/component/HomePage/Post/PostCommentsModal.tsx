import React from "react";
import Modal from "react-modal";
import { Comment } from "../../../actions/postActionDispatch";
import { MentionsInput, Mention } from "react-mentions";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { mentionInputStyle, mentionStyle } from "../../../util/mentionCSS";

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
  handleInputComment: any;
  handleLeaveComment: any;
  commentValue: Comment;
  isCommentsOpen: boolean;
  comments: Comment[];
  authUser: any;
  handleDeleteUserComment: (commentId: string) => void;
  handleClickUserMention: (username: string) => void;
}
function PostCommentsModal({
  setIsCommentsOpen,
  handleInputComment,
  handleLeaveComment,
  isCommentsOpen,
  commentValue,
  comments,
  authUser,
  handleDeleteUserComment,
  handleClickUserMention,
}: Props) {
  const allUsers = useSelector((state: any) => state.allUsers);
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
      <div className="md:w-[500px] w-full">
        <div className="flex items-center w-full mb-3">
          <div className="w-full flex flex-col">
            <div className="flex items-center justify-center mb-3 border border-purple-500 p-2">
              <MentionsInput
                value={commentValue.comment}
                onChange={(event, newValue, newPlainTextValue, mentions) =>
                  handleInputComment(
                    event,
                    newValue,
                    newPlainTextValue,
                    mentions
                  )
                }
                className="w-full"
                style={mentionInputStyle}
                placeholder="Add a comment"
              >
                <Mention
                  trigger="@"
                  data={allUsers.map((user: any) => ({
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
              disabled={commentValue.comment ? false : true}
              className={`p-2 rounded-lg text-white self-end ${
                commentValue.comment ? "bg-purple-500" : "bg-gray-400"
              }`}
              onClick={handleLeaveComment}
            >
              Comment
            </button>
          </div>
        </div>
        <div className="h-[300px] overflow-y-scroll">
          {comments.length ? (
            comments.map((comment) => (
              <div
                className="overflow-hidden group flex justify-between py-[1px] px-1 items-center"
                key={comment._id}
              >
                <p className="font-bold">
                  {comment.commentUserName}:{" "}
                  <span className="font-normal">
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
                  </span>
                </p>
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
            <div className="h-[300px] border flex items-center justify-center">
              <h2 className="font-bold">No comments yet</h2>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default PostCommentsModal;
