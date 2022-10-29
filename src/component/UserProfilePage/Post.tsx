import { Image } from "cloudinary-react";
import React, { useState } from "react";
import {
  deleteUserComment,
  leaveComment,
  likePost,
} from "../../actions/searchUserAction";
import { Comment } from "../../actions/postActionDispatch";
import { useAppDispatch } from "../../reducers/store";
import UserProfileInfoModal from "./UserProfileInfoModal";
import { useInternalRouter } from "../../pages/routing";
import { mentionUser } from "../../actions/authAction";
import { parsingMentionTag } from "../../util/parsingMentionTag";
import { MentionItem } from "react-mentions";
import CloudinaryImage from "../CommonComponents/CloudinaryImage";
import { toastError } from "../../util/toast";

function Post({ post, authUser }: any) {
  const [commentValue, setCommentValue] = useState<Comment>({
    comment: "",
    commentUserId: "",
    commentUserName: "",
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPostInfoOpen, setPostInfoOpen] = useState<boolean>(false);
  const [mentionUsers, setMentionUsers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { push } = useInternalRouter();
  const dispatch = useAppDispatch();
  const handleValueComment = (
    e: any,
    newValue: any,
    newPlainTextValue: any,
    mentions: MentionItem[]
  ) => {
    setCommentValue({ ...commentValue, comment: e.target.value });
    setMentionUsers(mentions.map((mention) => mention.id));
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
  const handleLikePost = async () => {
    if (!authUser._id) return toastError("Please sign in");
    if (isLoading) return;
    setIsLoading(true);
    await dispatch(
      likePost(post._id, authUser._id, post.userId, authUser.name, post.picture)
    );
    setIsLoading(false);
  };
  const handleDeleteUserComment = async (commentId: string) => {
    if (isLoading) return;
    setIsLoading(true);
    await dispatch(deleteUserComment(post._id, commentId));
    setIsLoading(false);
  };
  const handleLeaveComment = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    if (!authUser._id) return toastError("Please sign in");
    if (isLoading) return;
    setIsLoading(true);
    await dispatch(
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
    setIsLoading(false);
  };
  const handleClickHashtag = (hashtag: string) => {
    const removeHashtag = hashtag.replace("#", "");
    push(`/explore/hashtags/${removeHashtag}`);
  };
  const handleClickUserMention = (username: string) => {
    const removeText = username.replace("@", "");
    push(`/user/search/${removeText}`);
  };
  return (
    <>
      <div
        className="cursor-pointer flex justify-center items-center flex-col h-44 w-44"
        onClick={handleClickDetailPost}
      >
        <CloudinaryImage image={post.images[0]} />
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
        handleDeleteUserComment={handleDeleteUserComment}
        handleClickHashtag={handleClickHashtag}
        handleClickUserMention={handleClickUserMention}
      />
    </>
  );
}

export default Post;
