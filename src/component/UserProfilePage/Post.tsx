import { Image } from "cloudinary-react";
import React, { useState } from "react";
import { leaveComment } from "../../actions/authAction";
import { Comment } from "../../actions/postActionDispatch";
import { useAppDispatch } from "../../reducers/store";
import UserProfileInfoModal from "./UserProfileInfoModal";

function Post({ post, user }: any) {
  const [commentValue, setCommentValue] = useState<Comment>({
    comment: "",
    commentUserId: user._id,
    commentUserName: user.name,
  });
  console.log(commentValue);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPostInfoOpen, setPostInfoOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const handleValueComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentValue({ ...commentValue, comment: event.target.value });
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleClickDetailPost = () => {
    setIsModalOpen(true);
  };
  const handleClickPostInfo = () => {
    setPostInfoOpen((prev) => !prev);
  };
  const handleLeaveComment = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    dispatch(leaveComment(post._id, commentValue));
    setCommentValue({
      comment: "",
      commentUserId: user._id,
      commentUserName: user.name,
    });
  };
  return (
    <>
      <div
        className="cursor-pointer flex justify-center items-center flex-col h-44 w-44"
        onClick={handleClickDetailPost}
      >
        <Image
          key={post.picture}
          cloudName={process.env.REACT_APP_CLOUDINARY_USERNAME}
          publicId={post.picture}
          className="w-full h-full"
          crop="scale"
        />
      </div>
      <UserProfileInfoModal
        user={user}
        post={post}
        handleCloseModal={handleCloseModal}
        isModalOpen={isModalOpen}
        setPostInfoOpen={setPostInfoOpen}
        isPostInfoOpen={isPostInfoOpen}
        handleClickPostInfo={handleClickPostInfo}
        handleLeaveComment={handleLeaveComment}
        commentValue={commentValue}
        handleValueComment={handleValueComment}
      />
    </>
  );
}

export default Post;