import { Image } from "cloudinary-react";
import React, { useState } from "react";
import { deletePost, leaveComment } from "../../actions/authAction";
import { Comment } from "../../actions/postActionDispatch";
import { useAppDispatch } from "../../reducers/store";
import ProfileInfoModal from "./ProfileInfoModal";

function Post({ post, userInfo }: any) {
  const [commentValue, setCommentValue] = useState<Comment>({
    comment: "",
    commentUserId: userInfo._id,
    commentUserName: userInfo.name,
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPostInfoOpen, setPostInfoOpen] = useState<boolean>(false);
  const getUser = JSON.parse(localStorage.getItem("profile") || "");
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
    console.log("deleted");
    dispatch(deletePost(post._id, getUser.user._id));
    setIsModalOpen(false);
  };
  const handleLeaveComment = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    dispatch(leaveComment(post._id, commentValue));
    setCommentValue({
      comment: "",
      commentUserId: userInfo._id,
      commentUserName: userInfo.name,
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
      />
    </>
  );
}

export default Post;
