import React, { useRef, useState } from "react";
import { BsThreeDotsVertical, BsFillTrashFill } from "react-icons/bs";
import {
  AiOutlineHeart,
  AiOutlineComment,
  AiFillHeart,
  AiFillFlag,
} from "react-icons/ai";
import moment from "moment";
import { useAppDispatch } from "../../reducers/store";
import { deletePost, leaveComment, likePost } from "../../actions/postAction";
import { useEffect } from "react";
import PostCommentsModal from "./Post/PostCommentsModal";
import { Comment } from "../../actions/postActionDispatch";
import { Image } from "cloudinary-react";
import * as api from "../../api";
import PostReportModal from "./Post/PostReportModal";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";

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
interface ReportsList {
  reasons: string[];
  selected: string;
}
function Post({ post }: Props) {
  const [likedPost, setLikedPost] = useState<boolean>(false);
  const [isPostInfoOpen, setIsPostInfoOpen] = useState<boolean>(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);
  const [isReportLoading, setIsReportLoading] = useState<boolean>(false);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const getUser = JSON.parse(localStorage.getItem("profile") || "");
  const userInfo = useSelector((state: RootState) => state.auth);
  const [commentValue, setCommentValue] = useState<Comment>({
    comment: "",
    commentUserId: getUser.user._id,
    commentUserName: getUser.user.name,
  });
  const [reportsList, setReportsList] = useState<ReportsList>({
    reasons: [
      "Posting annoying content",
      "Posting spam",
      "Posting inappropriate content",
      "This profile is pretending to be someone else",
      "Might be posting my intellectual property without authorization",
    ],
    selected: "",
  });
  const dropDownRef = useRef(
    null
  ) as unknown as React.MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();

  const handleSubmitReport = () => {
    if (!reportsList.selected)
      return toast.error("No reason", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    setIsReportLoading(true);

    try {
      api.reportPost({
        ...post,
        reportUserId: userInfo._id,
        reportReason: reportsList.selected,
      });
      toast.success("Thank you for reporting a post", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsReportLoading(false);
      setIsReportOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("No reason", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsReportOpen(false);
    }
  };

  const handleClickReport = () => {
    setIsReportOpen((prev) => !prev);
  };

  const handleDeletePost = () => {
    dispatch(deletePost(post._id, getUser.user._id));
  };

  const handleLikePost = () => {
    dispatch(likePost(post._id, getUser.user._id));

    try {
      api.sendNotification(post.userId, {
        sender: getUser.user.name,
        notificationType: "liked",
      });
    } catch (error) {
      console.log(error, "HOME = > Post.tsx, sendNotification");
    }
  };

  const handleClickComments = () => {
    setIsCommentsOpen((prev) => !prev);
  };

  const handleLeaveComment = () => {
    if (!getUser || !commentValue.comment) return;

    dispatch(leaveComment(post._id, commentValue));
    setCommentValue({
      comment: "",
      commentUserId: getUser.user._id,
      commentUserName: getUser.user.name,
    });
    try {
      api.sendNotification(post.userId, {
        sender: getUser.user.name,
        notificationType: "Left a comment",
      });
    } catch (error) {
      console.log(error, "HOME = > Post.tsx, sendNotification");
    }
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

  useEffect(() => {
    const handleClickPostInfo = (e: any) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target))
        setIsPostInfoOpen(false);
    };
    document.addEventListener("mousedown", handleClickPostInfo, false);
    return () =>
      document.removeEventListener("mousedown", handleClickPostInfo, false);
  }, []);

  return (
    <>
      <div className="h-14 border flex justify-between items-center px-3">
        <div />
        <h1>{post.name}</h1>
        <div
          className="cursor-pointer hover:bg-slate-300 rounded-full h-7 w-7 flex justify-center items-center relative"
          onClick={() => setIsPostInfoOpen((prev) => !prev)}
        >
          <BsThreeDotsVertical size={20} />
          {isPostInfoOpen && (
            <div
              className={`absolute left-0 border bg-white p-2 ${
                post.userId === getUser.user._id ? "-bottom-20" : "-bottom-14"
              }`}
              ref={dropDownRef}
            >
              <div
                onClick={handleClickReport}
                className="flex justify-center items-center mb-3"
              >
                <AiFillFlag size={20} className="mr-2" />
                <p>Report</p>
              </div>
              {post.userId === getUser.user._id && (
                <div className="flex justify-center items-center">
                  <BsFillTrashFill size={20} className="mr-2" color="red" />
                  <p className="text-red-600" onClick={handleDeletePost}>
                    Delete
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="max-w-2xl h-[400px] mx-auto">
        <Image
          key={post.picture}
          cloudName={process.env.REACT_APP_CLOUDINARY_USERNAME}
          publicId={post.picture}
          className="w-full h-full"
          crop="scale"
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
      <PostReportModal
        setIsReportOpen={setIsReportOpen}
        isReportOpen={isReportOpen}
        setReportsList={setReportsList}
        reportsList={reportsList}
        handleSubmitReport={handleSubmitReport}
        isReportLoading={isReportLoading}
      />
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
