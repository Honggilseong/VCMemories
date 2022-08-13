import { Image } from "cloudinary-react";
import React, { useState } from "react";
import {
  deletePost,
  deleteUserComment,
  leaveComment,
  likePost,
} from "../../actions/authAction";
import { Comment } from "../../actions/postActionDispatch";
import { useAppDispatch } from "../../reducers/store";
import ProfileInfoModal from "./ProfileInfoModal";

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

  const handleClickDetailPost = () => {
    setIsModalOpen(true);
  };

  const handleClickPostInfo = () => {
    setPostInfoOpen((prev) => !prev);
  };

  const handleDeletePost = () => {
    dispatch(deletePost(post._id, authUser._id));
    setIsModalOpen(false);
  };

  const handleLikePost = () => {
    dispatch(
      likePost(post._id, authUser._id, post.userId, authUser.name, post.picture)
    );
  };
  const handleDeleteUserComment = (postId: string, commentId: string) => {
    dispatch(deleteUserComment(postId, commentId));
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
      <ProfileInfoModal
        post={post}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setPostInfoOpen={setPostInfoOpen}
        isPostInfoOpen={isPostInfoOpen}
        handleClickPostInfo={handleClickPostInfo}
        handleDeletePost={handleDeletePost}
        handleLeaveComment={handleLeaveComment}
        commentValue={commentValue}
        handleValueComment={handleValueComment}
        handleLikePost={handleLikePost}
        handleDeleteUserComment={handleDeleteUserComment}
      />
    </>
  );
}

export default Post;
