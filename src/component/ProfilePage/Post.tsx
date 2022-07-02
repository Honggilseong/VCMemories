import { Image } from "cloudinary-react";
import React, { useState } from "react";
import { deletePost } from "../../actions/authAction";
import { useAppDispatch } from "../../reducers/store";
import ProfileInfoModal from "./ProfileInfoModal";

function Post({ post }: any) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPostInfoOpen, setPostInfoOpen] = useState<boolean>(false);
  const getUser = JSON.parse(localStorage.getItem("profile") || "");
  const dispatch = useAppDispatch();
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
  return (
    <>
      <div
        className="cursor-pointer flex justify-center items-center flex-col"
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
      />
    </>
  );
}

export default Post;
