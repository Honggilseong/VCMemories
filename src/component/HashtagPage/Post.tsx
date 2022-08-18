import { Image } from "cloudinary-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  deleteUserComment,
  leaveComment,
  likePost,
} from "../../actions/hashtagPostsAction";
import { Comment, HashTagPost } from "../../actions/hashtagPostsDispatch";
import { useInternalRouter } from "../../pages/routing";
import { RootState, useAppDispatch } from "../../reducers/store";
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
  const handleLeaveComment = (event: React.FormEvent<EventTarget>) => {
    if (!commentValue.comment) return;
    event.preventDefault();
    dispatch(
      leaveComment(
        hashtagPost._id,
        {
          ...commentValue,
          commentUserId: authUser._id,
          commentUserName: authUser.name,
        },
        hashtagPost.userId,
        authUser.name,
        hashtagPost.picture
      )
    );
    setCommentValue({
      comment: "",
      commentUserId: "",
      commentUserName: "",
    });
  };
  const handleLikePost = () => {
    dispatch(
      likePost(
        hashtagPost._id,
        authUser._id,
        hashtagPost.userId,
        authUser.name,
        hashtagPost.picture
      )
    );
  };
  const handleInputComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentValue({ ...commentValue, comment: e.target.value });
  };
  const handleDeleteUserComment = (commentId: string) => {
    dispatch(deleteUserComment(hashtagPost._id, commentId));
  };
  return (
    <>
      <div className="mt-4">
        <div
          className="w-full xl:w-[800px] h-[500px] cursor-pointer"
          onClick={handleOpenPostModal}
        >
          <Image
            key={hashtagPost.picture}
            cloudName={process.env.REACT_APP_CLOUDINARY_USERNAME}
            publicId={hashtagPost.picture}
            className="w-full h-full"
            crop="scale"
          />
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
      />
    </>
  );
}

export default Post;
