import moment from "moment";
import React, { useMemo, useRef, useState } from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { MdOutlineReportProblem } from "react-icons/md";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  boardPostLeaveReply,
  deleteBoardPostReply,
  editBoardPostReply,
} from "../../actions/boardPostAction";
import { RootState, useAppDispatch } from "../../reducers/store";
import { toastError } from "../../util/toast";
import EditComment from "../CommonComponents/Forum/BoardPostDetail/Comment/EditComment";
import CommentInput from "./CommentInput";
interface Props {
  username: string;
  message: string;
  likes: string[];
  createdAt: number;
  replyId: string;
  replyUserId: string;
  handleClickLikeReply?: (replyId: string) => void;
  commentId: string;
  updatedAt: number;
}
function Reply({
  username,
  message,
  likes,
  createdAt,
  handleClickLikeReply,
  replyId,
  replyUserId,
  commentId,
  updatedAt,
}: Props) {
  const [isShowMore, setIsShowMore] = useState<boolean>(false);
  const [openReply, setOpenReply] = useState<boolean>(false);
  const [commentValue, setCommentValue] = useState<string>("");
  const [isEditComment, setIsEditComment] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editCommentValue, setEditCommentValue] = useState<string>(message);
  const authUser = useSelector((state: RootState) => state.auth);
  const params = useParams();
  const dispatch = useAppDispatch();
  const textLimit = useRef<number>(30);
  const commenter = useMemo(() => {
    const shortReview: string = message.slice(0, textLimit.current);

    if (message.length > textLimit.current) {
      if (isShowMore) {
        return message;
      }
      return shortReview;
    }
    return message;
  }, [isShowMore, message]);

  const handleClickReply = () => {
    setOpenReply((prev) => !prev);
  };

  const handleSetCommentValue = (e: any) => {
    setCommentValue(e.target.value);
  };

  const handleClickCommentMore = () => {
    setIsShowMore((prev) => !prev);
  };
  const handleLeaveReply = () => {
    if (isLoading) return;
    if (!authUser.name) return toastError("you need to sign in");
    setIsLoading(true);
    dispatch(
      boardPostLeaveReply(
        params.boardpostid,
        {
          commentUserId: authUser._id,
          commentUserName: authUser.name,
          comment: commentValue,
          createdAt: Date.now(),
          updatedAt: null,
          likes: [],
        },
        commentId
      )
    );
    setOpenReply(false);
    setCommentValue("");
    setIsLoading(false);
  };
  const handleDeleteReply = () => {
    if (isLoading) return;
    if (!authUser.name) return toastError("you need to sign in");
    setIsLoading(true);
    dispatch(
      deleteBoardPostReply(params.boardpostid, authUser._id, commentId, replyId)
    );
    setIsLoading(false);
  };
  const handleClickEditReply = () => {
    setIsEditComment((prev) => !prev);
  };
  const handleUpdateEditReply = () => {
    if (isLoading) return;
    if (!authUser.name) return toastError("you need to sign in");
    setIsLoading(true);
    dispatch(
      editBoardPostReply(
        params.boardpostid,
        commentId,
        replyId,
        editCommentValue
      )
    );
    setIsLoading(false);
    setIsEditComment(false);
  };
  return (
    <>
      <section className="w-full max-w-4xl p-2 border border-purple-500 mt-5">
        <div className="flex items-center justify-between border-b border-purple-500">
          <div className="flex items-center">
            {/* <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
              <img src={profilePicture} alt="profilePicture" />
            </div> */}
            <p className="font-bold">{username}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center">
              <FaRegThumbsUp
                size={13}
                className="cursor-pointer mr-1"
                onClick={() => handleClickLikeReply(replyId)}
              />
              <p className="text-sm">{likes?.length}</p>
            </div>
            <div className="text-xs">
              {updatedAt ? (
                <>
                  {moment(updatedAt).format("MM/DD/YY")}
                  <span className="text-gray-500">(edited)</span>
                </>
              ) : (
                moment(createdAt).format("MM/DD/YY")
              )}
            </div>
            <div className="cursor-pointer text-xs">
              <MdOutlineReportProblem size={15} color="red" />
            </div>
          </div>
        </div>
        {isEditComment ? (
          <EditComment
            setEditCommentValue={setEditCommentValue}
            editCommentValue={editCommentValue}
          />
        ) : (
          <span className="whitespace-pre">{commenter}</span>
        )}
        {!isEditComment && (
          <span
            className="text-gray-500 cursor-pointer"
            onClick={handleClickCommentMore}
          >
            {message.length > textLimit.current &&
              (isShowMore ? "[close]" : "...[more]")}
          </span>
        )}
        <div className="flex gap-4 text-xs mt-4 items-center">
          <div
            onClick={handleClickReply}
            className="text-gray-500 cursor-pointer"
          >
            Reply
          </div>
          {replyUserId === authUser._id && (
            <>
              <div
                className="text-gray-500 cursor-pointer"
                onClick={handleDeleteReply}
              >
                Delete
              </div>
              <div
                className={`text-gray-500 cursor-pointer ${
                  isEditComment && "text-green-500 hover:text-green-600"
                }`}
                onClick={
                  isEditComment ? handleUpdateEditReply : handleClickEditReply
                }
              >
                {isEditComment ? "Update" : "Edit"}
              </div>
              {isEditComment && (
                <div
                  className="text-gray-500 cursor-pointer"
                  onClick={handleClickEditReply}
                >
                  Cancel
                </div>
              )}
            </>
          )}
        </div>
      </section>
      {openReply && (
        <section className="w-full">
          <CommentInput
            handleSetCommentValue={handleSetCommentValue}
            commentValue={commentValue}
            isReply
            handleLeaveReply={handleLeaveReply}
          />
        </section>
      )}
    </>
  );
}

export default Reply;
