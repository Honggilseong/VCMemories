import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineHeart, AiOutlineComment, AiFillHeart } from "react-icons/ai";
import moment from "moment";
import { useAppDispatch } from "../../reducers/store";
import { deletePost, leaveComment, likePost } from "../../actions/postAction";
import { useEffect } from "react";
import PostCommentsModal from "./Post/PostCommentsModal";
import { Comment } from "../../actions/postActionDispatch";
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
    comments: Comment[];
  };
}

function Post({ post }: Props) {
  const [likedPost, setLikedPost] = useState<boolean>(false);
  const [isPostInfoOpen, setIsPostInfoOpen] = useState<boolean>(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);
  const getUser = JSON.parse(localStorage.getItem("profile") || "");
  const [commentValue, setCommentValue] = useState<Comment>({
    comment: "",
    commentUserId: getUser.user._id,
    commentUserName: getUser.user.name,
  });
  const dispatch = useAppDispatch();

  const handleDeletePost = (e: any) => {
    e.preventDefault();
    dispatch(deletePost(post._id, getUser.user._id));
  };

  const handleClickPostInfo = (e: any) => {
    e.preventDefault();
    setIsPostInfoOpen((prev) => !prev);
  };

  const handleLikePost = (e: any) => {
    e.preventDefault();
    dispatch(likePost(post._id, getUser.user._id));
  };

  const handleClickComments = (e: any) => {
    setIsCommentsOpen((prev) => !prev);
  };
  const handleLeaveComment = (e: any) => {
    e.preventDefault();
    if (!getUser || !commentValue.comment) return;

    dispatch(leaveComment(post._id, commentValue));
    setCommentValue({
      comment: "",
      commentUserId: getUser.user._id,
      commentUserName: getUser.user.name,
    });
  };

  const handleInputComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentValue({ ...commentValue, comment: e.target.value });
  };
  useEffect(() => {
    const likedPost = post.likes.findIndex((id) => id === getUser.user._id);
    if (likedPost === -1) {
      setLikedPost(false);
    } else {
      setLikedPost(true);
    }
  }, [post.likes]);

  return (
    <>
      <div className="h-14 border flex justify-between items-center px-3">
        <div />
        <h1>{post.name}</h1>

        <div
          className="cursor-pointer hover:bg-slate-300 rounded-full h-7 w-7 flex justify-center items-center relative"
          onClick={handleClickPostInfo}
        >
          <BsThreeDotsVertical size={20} />
          {isPostInfoOpen && (
            <div
              className={`absolute left-0 border bg-white p-2 ${
                post.userId === getUser.user._id ? "-bottom-16" : "-bottom-10"
              }`}
            >
              <p>Report</p>
              {post.userId === getUser.user._id && (
                <p className="text-red-600" onClick={handleDeletePost}>
                  Delete
                </p>
              )}
            </div>
          )}
        </div>
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
          {likedPost ? (
            <AiFillHeart size={30} color="red" />
          ) : (
            <AiOutlineHeart size={30} />
          )}

          <span>{post.likes.length}</span>
        </div>
        <div
          className="flex-[0.5] justify-center flex items-center h-14 border cursor-pointer"
          onClick={handleClickComments}
        >
          <AiOutlineComment size={30} />
          <span>{post.comments.length}</span>
        </div>
      </div>

      <PostCommentsModal
        comments={post.comments}
        setIsCommentsOpen={setIsCommentsOpen}
        isCommentsOpen={isCommentsOpen}
        handleLeaveComment={handleLeaveComment}
        handleInputComment={handleInputComment}
        commentValue={commentValue}
      />
    </>
  );
}

export default Post;
