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
import {
  deletePost,
  deleteUserComment,
  leaveComment,
  likePost,
} from "../../actions/postAction";
import { useEffect } from "react";
import { Comment } from "../../actions/postActionDispatch";
import * as api from "../../api";
import PostReportModal from "./Post/PostReportModal";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { toastError, toastSuccess } from "../../util/toast";
import { useInternalRouter } from "../../pages/routing";
import { v4 as uuidv4 } from "uuid";
import { MentionItem } from "react-mentions";
import { mentionUser } from "../../actions/authAction";
import { parsingMentionTag } from "../../util/parsingMentionTag";
import { useIsTruncated } from "../../hooks/useIsTruncated";
import Carousel from "../CommonComponents/Carousel";
import PostCommentsModal from "./Post/PostCommentsModal";

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
    isEdit: boolean;
    postType: string;
    images: string[];
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
  const [isOpenText, setIsOpenText] = useState<boolean>(false);
  const [mentionUsers, setMentionUsers] = useState<string[]>([]);
  const authUser = useSelector((state: RootState) => state.auth);
  const { push } = useInternalRouter();
  const [commentValue, setCommentValue] = useState<Comment>({
    comment: "",
    commentUserId: "",
    commentUserName: "",
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
  const textRef = useRef(null);
  const isTruncated = useIsTruncated(textRef);
  const dropDownRef = useRef(
    null
  ) as unknown as React.MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();

  const handleSubmitReport = () => {
    if (!reportsList.selected) return toastError("No reason");
    setIsReportLoading(true);

    try {
      api.reportPost({
        ...post,
        reportUserId: authUser._id,
        reportReason: reportsList.selected,
      });
      toastSuccess("Thank you for reporting a post");
      setIsReportLoading(false);
      setIsReportOpen(false);
    } catch (error) {
      console.log(error);
      toastError("Sorry, Something went wrong... try again...");
      setIsReportOpen(false);
    }
  };

  const handleClickReport = () => {
    setIsReportOpen((prev) => !prev);
  };

  const handleDeletePost = () => {
    dispatch(deletePost(post._id, authUser._id));
  };

  const handleLikePost = () => {
    dispatch(
      likePost(post._id, authUser._id, post.userId, authUser.name, post.picture)
    );
  };

  const handleClickComments = () => {
    setIsCommentsOpen((prev) => !prev);
  };
  const handleDeleteUserComment = (commentId: string) => {
    dispatch(deleteUserComment(post._id, commentId));
  };
  const handleLeaveComment = (event: React.FormEvent<EventTarget>) => {
    if (!commentValue.comment) return;
    event.preventDefault();
    dispatch(
      leaveComment(
        post._id,
        {
          comment: parsingMentionTag(commentValue.comment),
          commentUserId: authUser._id,
          commentUserName: authUser.name,
        },
        post.userId,
        authUser.name,
        post.picture
      )
    );
    if (mentionUsers.length > 0) {
      dispatch(
        mentionUser(
          post._id,
          authUser.name,
          post.picture,
          "mentioned",
          mentionUsers
        )
      );
    }
    setCommentValue({
      comment: "",
      commentUserId: "",
      commentUserName: "",
    });
  };
  const handleClickHashtag = (hashtag: string) => {
    const removeHashtag = hashtag.replace("#", "");
    push(`/explore/hashtags/${removeHashtag}`);
  };
  const handleClickUserMention = (username: string) => {
    const removeText = username.replace("@", "");
    push(`/user/search/${removeText}`);
  };
  const handleInputComment = (
    e: any,
    newValue: any,
    newPlainTextValue: any,
    mentions: MentionItem[]
  ) => {
    setCommentValue({ ...commentValue, comment: e.target.value });
    setMentionUsers(mentions.map((mention) => mention.id));
  };
  const handleClickMoreButton = () => {
    setIsOpenText((prev) => !prev);
  };
  useEffect(() => {
    const likedPost = post.likes.findIndex((id) => id === authUser._id);
    if (likedPost === -1) {
      setLikedPost(false);
    } else {
      setLikedPost(true);
    }
  }, [post.likes]);
  const handleClickUsername = (name: string) => {
    push(`/user/search/${name.toLowerCase()}`);
  };
  useEffect(() => {
    const handleClickPostInfo = (e: any) => {
      if (
        isPostInfoOpen &&
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target)
      )
        setIsPostInfoOpen(false);
    };
    document.addEventListener("mousedown", handleClickPostInfo, false);
    return () =>
      document.removeEventListener("mousedown", handleClickPostInfo, false);
  }, [isPostInfoOpen]);

  return (
    <>
      <div className="h-14 w-full xl:w-[800px] border flex justify-between items-center px-3">
        <div />
        <h1
          className="font-bold cursor-pointer"
          onClick={() => handleClickUsername(post.name)}
        >
          {post.name}
        </h1>
        <div
          className="cursor-pointer hover:bg-slate-300 rounded-full h-7 w-7 flex justify-center items-center relative"
          onClick={() => setIsPostInfoOpen((prev) => !prev)}
          ref={dropDownRef}
        >
          <BsThreeDotsVertical size={20} />
          {isPostInfoOpen && (
            <div
              className={`absolute left-0 border bg-white p-2 ${
                post.userId === authUser._id ? "-bottom-20" : "-bottom-14"
              }`}
            >
              <div
                onClick={handleClickReport}
                className="flex justify-center items-center mb-3"
              >
                <AiFillFlag size={20} className="mr-2" />
                <p>Report</p>
              </div>
              {post.userId === authUser._id && (
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
      <div className="w-full xl:w-[800px] h-[500px] flex items-center justify-center">
        <Carousel images={post.images} />
      </div>
      <div className="my-2">
        <h2 className="font-bold text-lg">{post.title}</h2>
        <p
          className={`whitespace-pre ${
            isOpenText ? "line-clamp-none" : "line-clamp-2"
          }`}
          ref={textRef}
        >
          {post.message.split(" ").map((msg) => {
            if (msg.startsWith("#")) {
              return (
                <span
                  key={uuidv4()}
                  className="cursor-pointer text-blue-500"
                  onClick={() => handleClickHashtag(msg)}
                >
                  {msg}{" "}
                </span>
              );
            } else {
              return msg + " ";
            }
          })}
        </p>
        {isTruncated && (
          <button
            onClick={handleClickMoreButton}
            className="hover:text-gray-500 text-gray-400 hover:underline"
          >
            {isOpenText ? "[less]" : "[more]"}
          </button>
        )}
        <div className="flex">
          <p className="text-gray-500 text-sm mr-1">
            {moment(post.createdAt).fromNow()}
          </p>
          {post.isEdit && <p className="text-gray-500 text-sm">(edited)</p>}
        </div>
      </div>
      <div className="flex w-full xl:w-[800px]">
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
        authUser={authUser}
        handleDeleteUserComment={handleDeleteUserComment}
        handleClickUserMention={handleClickUserMention}
      />
    </>
  );
}

export default Post;
