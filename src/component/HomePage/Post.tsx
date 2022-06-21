import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import moment from "moment";
import { useAppDispatch } from "../../reducers/store";
import { deletePost, likePost } from "../../actions/postAction";
interface Props {
  post: {
    createdAt: string;
    likes: string[];
    message: string;
    name: string;
    picture: string;
    tags: string[];
    title: string;
    _id: string;
    userId: string;
    profilePicture: string;
  };
}

function Post({ post }: Props) {
  const dispatch = useAppDispatch();
  const getUser = JSON.parse(localStorage.getItem("profile") || "");
  const handleDeletePost = (e: any) => {
    e.preventDefault();
    dispatch(deletePost(post._id, getUser.user._id));
  };
  const handleLikePost = (e: any) => {
    e.preventDefault();
    dispatch(likePost(post._id, getUser.user._id));
  };
  return (
    <>
      <div className="h-14 border flex justify-between items-center px-3">
        <div />
        <h1>{post.name}</h1>
        {post.userId === getUser.user._id && (
          <div
            className="cursor-pointer hover:bg-slate-300 rounded-full h-7 w-7 flex justify-center items-center"
            onClick={handleDeletePost}
          >
            <BsThreeDotsVertical size={20} />
          </div>
        )}
      </div>
      <div className="max-w-2xl mx-auto">
        <img
          src={require("../../images/vc.png")}
          alt="userImage"
          className="object-cover"
        />
      </div>
      <div className="my-2">
        <p>{post.message}</p>
        <p>{post.tags.map((tag: string) => tag)}</p>
        <p>{moment(post.createdAt).fromNow()}</p>
      </div>
      <div className="flex">
        <div
          className="flex-[0.5] justify-center flex items-center h-14 border cursor-pointer"
          onClick={handleLikePost}
        >
          <AiOutlineHeart size={30} />
          <span>{post.likes.length}</span>
        </div>
        <div className="flex-[0.5] justify-center flex items-center h-14 border cursor-pointer">
          <AiOutlineComment size={30} />
          <span>31</span>
        </div>
      </div>
    </>
  );
}

export default Post;
