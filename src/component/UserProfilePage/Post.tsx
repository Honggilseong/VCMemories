import { Image } from "cloudinary-react";
import React, { useState } from "react";
import { leaveComment, likePost } from "../../actions/searchUserAction";
import { Comment } from "../../actions/postActionDispatch";
import { useAppDispatch } from "../../reducers/store";
import UserProfileInfoModal from "./UserProfileInfoModal";

function Post({ post, authUser }: any) {
  const [commentValue, setCommentValue] = useState<Comment>({
    comment: "",
    commentUserId: "",
    commentUserName: "",
  });
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
  const handleLikePost = () => {
    dispatch(
      likePost(post._id, authUser._id, post.userId, authUser.name, post.picture)
    );
  };
  const handleLeaveComment = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    dispatch(
      leaveComment(
        post._id,
        {
          ...commentValue,
          commentUserId: authUser._id,
          commentUserName: authUser.name,
        },
        post.userId,
        authUser.name,
        post.picture
      )
    );
    setCommentValue({
      comment: "",
      commentUserId: "",
      commentUserName: "",
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
        authUser={authUser}
        post={post}
        handleCloseModal={handleCloseModal}
        isModalOpen={isModalOpen}
        setPostInfoOpen={setPostInfoOpen}
        isPostInfoOpen={isPostInfoOpen}
        handleClickPostInfo={handleClickPostInfo}
        handleLeaveComment={handleLeaveComment}
        commentValue={commentValue}
        handleValueComment={handleValueComment}
        handleLikePost={handleLikePost}
      />
    </>
  );
}

export default Post;
