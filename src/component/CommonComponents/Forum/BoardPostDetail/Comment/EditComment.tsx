import React, { useCallback, useRef } from "react";
interface Props {
  setEditCommentValue: React.Dispatch<React.SetStateAction<string>>;
  editCommentValue: string;
}
function EditComment({ setEditCommentValue, editCommentValue }: Props) {
  const textRef = useRef(null);

  const handleInputComment = (e: any) => {
    setEditCommentValue(e.target.value);
  };

  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);

  return (
    <div className="w-full">
      <textarea
        value={editCommentValue}
        ref={textRef}
        onInput={handleResizeHeight}
        onChange={handleInputComment}
        placeholder="Edit your comment"
        className="w-full h-full focus:outline-none resize-none"
      />
    </div>
  );
}

export default EditComment;
