import moment from "moment";
import React, { useState } from "react";
import { MentionItem } from "react-mentions";
import { useSelector } from "react-redux";
import { mentionUser } from "../../actions/authAction";
import {
  deleteUserComment,
  leaveComment,
  likePost,
} from "../../actions/hashtagPostsAction";
import { Comment, HashTagPost } from "../../actions/hashtagPostsDispatch";
import { useInternalRouter } from "../../pages/routing";
import { RootState, useAppDispatch } from "../../reducers/store";
import { parsingMentionTag } from "../../util/parsingMentionTag";
import CloudinaryImage from "../CommonComponents/CloudinaryImage";
import HashtagPostDetailModal from "./HashtagPostDetailModal";
interface Props {
  hashtagPost: HashTagPost;
}
function Post({ hashtagPost }: Props) {
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);
  const [commentValue, setCommentValue] = useState<Comment>({
    comment: "",
    commentUserId: "",
    commentUserName: "",
  });
  const [mentionUsers, setMentionUsers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const authUser = useSelector((state: RootState) => state.auth);
  const { push } = useInternalRouter();
  const dispatch = useAppDispatch();
  const handleOpenPostModal = () => {
    setIsPostModalOpen(true);
  };
  const handleClosePostModal = () => {
    setIsPostModalOpen(false);
  };
  const handleClickHashtag = (hashtag: string) => {
    const removeHashtag = hashtag.replace("#", "");
    push(`/explore/hashtags/${removeHashtag}`);
    setIsPostModalOpen(false);
  };
  const handleLeaveComment = async (event: React.FormEvent<EventTarget>) => {
    if (!commentValue.comment || isLoading) return;
    event.preventDefault();
    setIsLoading(true);
    await dispatch(
      leaveComment(
        hashtagPost._id,
        {
          comment: parsingMentionTag(commentValue.comment),
          commentUserId: authUser._id,
          commentUserName: authUser.name,
        },
        hashtagPost.userId,
        authUser.name,
        hashtagPost.picture
      )
    );
    if (mentionUsers.length > 0) {
      dispatch(
        mentionUser(
          hashtagPost._id,
          authUser.name,
          hashtagPost.picture,
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
  const handleLikePost = async () => {
    if (isLoading) return;
    setIsLoading(true);
    await dispatch(
      likePost(
        hashtagPost._id,
        authUser._id,
        hashtagPost.userId,
        authUser.name,
        hashtagPost.picture
      )
    );
    setIsLoading(false);
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
  const handleDeleteUserComment = async (commentId: string) => {
    if (isLoading) return;
    setIsLoading(true);
    await dispatch(deleteUserComment(hashtagPost._id, commentId));
    setIsLoading(false);
  };
  const handleClickUsername = (username: string) => {
    push(`/user/search/${username}`);
  };
  const handleClickUserMention = (username: string) => {
    const removeText = username.replace("@", "");
    push(`/user/search/${removeText}`);
  };
  return (
    <>
      <div className="mt-4">
        <div className="group w-full xl:w-[800px] h-[500px] relative">
          <div className="absolute top-0 left-0 hidden group-hover:flex bg-white h-12 w-full justify-between items-center">
            <div />
            <p
              className="font-bold cursor-pointer"
              onClick={() => handleClickUsername(hashtagPost.name)}
            >
              {hashtagPost.name}
            </p>
            <p className="text-sm text-gray-400">
              {moment(hashtagPost.createdAt).format("MMM Do YY")}
            </p>
          </div>
          <div
            className="cursor-pointer w-full h-full"
            onClick={handleOpenPostModal}
          >
            <CloudinaryImage image={hashtagPost.images[0]} />
          </div>
        </div>
      </div>
      <HashtagPostDetailModal
        hashtagPost={hashtagPost}
        handleClosePostModal={handleClosePostModal}
        isPostModalOpen={isPostModalOpen}
        handleClickHashtag={handleClickHashtag}
        handleLikePost={handleLikePost}
        authUser={authUser}
        handleLeaveComment={handleLeaveComment}
        handleInputComment={handleInputComment}
        commentValue={commentValue}
        handleDeleteUserComment={handleDeleteUserComment}
        handleClickUserMention={handleClickUserMention}
      />
    </>
  );
}

export default Post;
