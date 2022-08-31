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

function Post({ post, authUser }: any) {
  const [commentValue, setCommentValue] = useState<Comment>({
    comment: "",
    commentUserId: "",
    commentUserName: "",
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPostInfoOpen, setPostInfoOpen] = useState<boolean>(false);
  const [mentionUsers, setMentionUsers] = useState<string[]>([]);
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
  const handleLikePost = () => {
    dispatch(
      likePost(post._id, authUser._id, post.userId, authUser.name, post.picture)
    );
  };
  const handleDeleteUserComment = (commentId: string) => {
    dispatch(deleteUserComment(post._id, commentId));
  };
  const handleLeaveComment = (event: React.FormEvent<EventTarget>) => {
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
        handleDeleteUserComment={handleDeleteUserComment}
        handleClickHashtag={handleClickHashtag}
        handleClickUserMention={handleClickUserMention}
      />
    </>
  );
}

export default Post;
