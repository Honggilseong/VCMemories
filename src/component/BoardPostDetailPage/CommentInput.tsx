import React, { useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/store";
interface Props {
  commentValue: string;
  handleSetCommentValue: (e: any) => void;
  isReply?: boolean;
  handleLeaveComment?: () => void;
  handleLeaveReply?: () => void;
}
function CommentInput({
  commentValue,
  handleSetCommentValue,
  handleLeaveComment,
  handleLeaveReply,
  isReply,
}: Props) {
  const textRef = useRef(null);
  const authUser = useSelector((state: RootState) => state.auth);
  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);
  return (
    <div className="border border-purple-500 w-full my-4">
      <div className="border flex justify-between">
        <div className="flex items-center p-1">
          <p className="font-bold">{!authUser.name ? "" : authUser.name}</p>
        </div>
        <div
          className="p-1 border rounded-lg bg-purple-500 text-white text-xs flex justify-center items-center cursor-pointer"
          onClick={() => (isReply ? handleLeaveReply() : handleLeaveComment())}
        >
          Comment
        </div>
      </div>
      <div className="w-full">
        <textarea
          value={commentValue}
          ref={textRef}
          onInput={handleResizeHeight}
          onChange={handleSetCommentValue}
          placeholder="Add a comment"
          className="w-full h-full focus:outline-none p-1 resize-none"
        />
      </div>
    </div>
  );
}

export default CommentInput;
