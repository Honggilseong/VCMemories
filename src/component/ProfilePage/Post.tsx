import { Image } from "cloudinary-react";
import React, { useState } from "react";
import {
  deletePost,
  deleteUserComment,
  editUserPost,
  leaveComment,
  likePost,
} from "../../actions/authAction";
import { Comment } from "../../actions/postActionDispatch";
import { useInternalRouter } from "../../pages/routing";
import { useAppDispatch } from "../../reducers/store";
import ProfileInfoModal from "./ProfileInfoModal";
interface EditTextValue {
  message: string;
  title: string;
}
function Post({ post, authUser }: any) {
  const [commentValue, setCommentValue] = useState<Comment>({
    comment: "",
    commentUserId: "",
    commentUserName: "",
  });
  const [editTextValue, setEditTextValue] = useState<EditTextValue>({
    message: "",
    title: "",
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isRemindModalOepn, isRemindModalOpen] = useState<boolean>(false);
  const { push } = useInternalRouter();
  const dispatch = useAppDispatch();

  const handleValueComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentValue({ ...commentValue, comment: event.target.value });
  };
  const handleEditValueTitleMessage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name } = event.target;
    setEditTextValue({ ...editTextValue, [name]: event.target.value });
    console.log(editTextValue);
  };
  const handleClickDetailPost = () => {
    setIsModalOpen(true);
  };

  const handleDeletePost = () => {
    dispatch(deletePost(post._id, authUser._id));
    setIsModalOpen(false);
  };

  const handleLikePost = () => {
    dispatch(
      likePost(post._id, authUser._id, post.userId, authUser.name, post.picture)
    );
  };
  const handleDeleteUserComment = (postId: string, commentId: string) => {
    dispatch(deleteUserComment(postId, commentId));
  };
  const handleLeaveComment = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    dispatch(
      leaveComment(
        post._id,
        {
          ...commentValue,
          commentUserId: authUser._id,
          commentUserName: authUser.name,
        },
        post.userId,
        authUser.name,
        post.picture
      )
    );
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
  const handleClickEditPost = () => {
    if (!isEdit) setEditTextValue({ message: post.message, title: post.title });
    setIsEdit((prev) => !prev);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEdit(false);
    setEditTextValue({ message: "", title: "" });
  };
  const handleClickUpdatePost = () => {
    dispatch(
      editUserPost(post._id, editTextValue.message, editTextValue.title)
    );
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
        handleDeletePost={handleDeletePost}
        handleLeaveComment={handleLeaveComment}
        commentValue={commentValue}
        handleValueComment={handleValueComment}
        handleLikePost={handleLikePost}
        handleDeleteUserComment={handleDeleteUserComment}
        handleClickHashtag={handleClickHashtag}
        handleClickEditPost={handleClickEditPost}
        isEdit={isEdit}
        handleEditValueTitleMessage={handleEditValueTitleMessage}
        editTextValue={editTextValue}
        handleCloseModal={handleCloseModal}
        handleClickUpdatePost={handleClickUpdatePost}
      />
    </>
  );
}

export default Post;
