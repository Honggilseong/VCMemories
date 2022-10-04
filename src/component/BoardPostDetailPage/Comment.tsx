import moment from "moment";
import { useCallback, useMemo, useRef, useState } from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { MdOutlineReportProblem } from "react-icons/md";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  boardPostLeaveReply,
  editBoardPostComment,
  likeBoardPostComment,
  likeBoardPostReply,
} from "../../actions/boardPostAction";
import { Reply as ReplyType } from "../../actions/boardPostDispatch";
import { RootState, useAppDispatch } from "../../reducers/store";
import { toastError } from "../../util/toast";
import EditComment from "../CommonComponents/Forum/BoardPostDetail/Comment/EditComment";
import CommentInput from "./CommentInput";
import Reply from "./Reply";

interface Props {
  username: string;
  message: string;
  likes: string[];
  replies: ReplyType[];
  commentId: string;
  createdAt: number;
  updatedAt: number;
  commentUserId: string;
  handleDeleteComment: (commentId: string) => void;
}

function Comment({
  username,
  message,
  likes,
  replies,
  commentId,
  createdAt,
  commentUserId,
  handleDeleteComment,
  updatedAt,
}: Props) {
  const [isShowMore, setIsShowMore] = useState<boolean>(false);
  const [openReply, setOpenReply] = useState<boolean>(false);
  const [commentValue, setCommentValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditComment, setIsEditComment] = useState<boolean>(false);
  const [editCommentValue, setEditCommentValue] = useState<string>(message);
  const params = useParams();
  const dispatch = useAppDispatch();
  const authUser = useSelector((state: RootState) => state.auth);
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
  const handleClickLikeComment = () => {
    if (isLoading) return;
    if (!authUser.name) return toastError("you need to sign in");
    setIsLoading(true);
    dispatch(likeBoardPostComment(params.boardpostid, authUser._id, commentId));
    setIsLoading(false);
  };
  const handleClickLikeReply = (replyId: string) => {
    if (!authUser.name) return toastError("you need to sign in");
    dispatch(
      likeBoardPostReply(params.boardpostid, authUser._id, commentId, replyId)
    );
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
  const handleClickEditComment = () => {
    setIsEditComment((prev) => !prev);
  };
  const handleUpdateEditComment = () => {
    if (isLoading) return;
    setIsLoading(true);
    dispatch(
      editBoardPostComment(params.boardpostid, commentId, editCommentValue)
    );
    setIsLoading(false);
    setIsEditComment(false);
  };
  return (
    <>
      <section className={`w-full max-w-4xl p-2 border border-purple-500 mt-5`}>
        <div className="flex items-center justify-between border-b border-purple-500">
          <div className="flex items-center">
            <p className="font-bold">{username}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center">
              <FaRegThumbsUp
                size={13}
                className="cursor-pointer mr-1"
                onClick={handleClickLikeComment}
              />
              <p className="text-sm">{likes?.length}</p>
            </div>
            <div className="text-xs">
              {" "}
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
          {commentUserId === authUser._id && (
            <>
              <div
                className="text-red-500 cursor-pointer hover:text-red-600"
                onClick={() => handleDeleteComment(commentId)}
              >
                Delete
              </div>
              <div
                className={`text-gray-500 cursor-pointer ${
                  isEditComment && "text-green-500 hover:text-green-600"
                }`}
                onClick={
                  isEditComment
                    ? handleUpdateEditComment
                    : handleClickEditComment
                }
              >
                {isEditComment ? "Update" : "Edit"}
              </div>
              {isEditComment && (
                <div
                  className="text-gray-500 cursor-pointer"
                  onClick={handleClickEditComment}
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
            handleLeaveReply={handleLeaveReply}
            isReply
          />
        </section>
      )}
      {replies?.length > 0 && (
        <section className="pl-20">
          {replies.map((reply) => (
            <Reply
              username={reply.commentUserName}
              key={reply._id}
              message={reply.comment}
              likes={reply.likes}
              replyId={reply._id}
              replyUserId={reply.commentUserId}
              createdAt={reply.createdAt}
              handleClickLikeReply={handleClickLikeReply}
              commentId={commentId}
              updatedAt={reply.updatedAt}
            />
          ))}
        </section>
      )}
    </>
  );
}

export default Comment;
