import { Image } from "cloudinary-react";
import React, { useState } from "react";
import { MentionItem } from "react-mentions";
import {
  deletePost,
  deleteUserComment,
  editUserPost,
  leaveComment,
  likePost,
  mentionUser,
} from "../../actions/authAction";
import { Comment } from "../../actions/postActionDispatch";
import { useInternalRouter } from "../../pages/routing";
import { useAppDispatch } from "../../reducers/store";
import { parsingMentionTag } from "../../util/parsingMentionTag";
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
        handleClickUserMention={handleClickUserMention}
      />
    </>
  );
}

export default Post;
