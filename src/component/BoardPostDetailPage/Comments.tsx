import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteBoardPostComment,
  leaveBoardPostComment,
} from "../../actions/boardPostAction";
import { Comment as CommentType } from "../../actions/boardPostDispatch";
import { RootState, useAppDispatch } from "../../reducers/store";
import { toastError } from "../../util/toast";
import Comment from "./Comment";
import CommentInput from "./CommentInput";

interface Props {
  commentValue: string;
  handleSetCommentValue: (e: any) => void;
  comments: CommentType[];
  setCommentValue: React.Dispatch<React.SetStateAction<string>>;
}
function Comments({
  handleSetCommentValue,
  commentValue,
  comments,
  setCommentValue,
}: Props) {
  const params = useParams();
  const dispatch = useAppDispatch();
  const authUser = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleLeaveComment = () => {
    if (isLoading) return;
    if (!authUser.name) return toastError("you need to sign in");
    setIsLoading(true);
    dispatch(
      leaveBoardPostComment(params.boardpostid, {
        commentUserId: authUser._id,
        commentUserName: authUser.name,
        comment: commentValue,
        createdAt: Date.now(),
        updatedAt: null,
        likes: [],
        replies: [],
      })
    );
    setCommentValue("");
    setIsLoading(false);
  };
  const handleDeleteComment = (commentId: string) => {
    if (isLoading) return;
    if (!authUser.name) return toastError("you need to sign in");
    setIsLoading(true);
    dispatch(
      deleteBoardPostComment(params.boardpostid, authUser._id, commentId)
    );
    setIsLoading(false);
  };
  return (
    <section className="w-full">
      <div className="border-b-2 border-black text-2xl font-bold py-3">
        <p>Comments</p>
      </div>
      <div>
        <CommentInput
          commentValue={commentValue}
          handleSetCommentValue={handleSetCommentValue}
          handleLeaveComment={handleLeaveComment}
        />
      </div>
      {comments?.map((comment) => (
        <Comment
          key={comment._id}
          username={comment.commentUserName}
          likes={comment.likes}
          message={comment.comment}
          replies={comment.replies}
          createdAt={comment.createdAt}
          commentId={comment._id}
          commentUserId={comment.commentUserId}
          handleDeleteComment={handleDeleteComment}
          updatedAt={comment.updatedAt}
        />
      ))}
    </section>
  );
}

export default Comments;
