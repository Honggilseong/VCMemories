import { useEffect, useRef, useState } from "react";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import {
  deleteNotifications,
  deleteUserComment,
  leaveComment,
  likePost,
  mentionUser,
  readNotifications,
} from "../../../actions/authAction";
import { useAppDispatch } from "../../../reducers/store";
import UserPostModal from "./Notification/UserPostModal";
import { Comment } from "../../../actions/postActionDispatch";
import * as api from "../../../api";
import { useInternalRouter } from "../../../pages/routing";
import { MentionItem } from "react-mentions";
import { parsingMentionTag } from "../../../util/parsingMentionTag";
import CloudinaryImage from "../../CommonComponents/CloudinaryImage";

export interface Notifications {
  _id: string;
  read: boolean;
  sender: string;
  image?: string;
  notificationType: string;
  postId?: string;
}
function Notification() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notificationsCount, setNotificationsCount] = useState<number>(0);
  const [isUserPostModalOpen, setIsUserPostModalOpen] =
    useState<boolean>(false);
  const [modalPost, setModalPost] = useState<any>(null);
  const [commentValue, setCommentValue] = useState<Comment>({
    comment: "",
    commentUserId: "",
    commentUserName: "",
  });
  const [mentionUsers, setMentionUsers] = useState<string[]>([]);
  const { push } = useInternalRouter();
  const authUser = useSelector((state: RootState) => state.auth);
  const dropDownRef = useRef(
    null
  ) as unknown as React.MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
  const handleDeleteUserComment = (postId: string, commentId: string) => {
    dispatch(deleteUserComment(postId, commentId));
    setModalPost({
      ...modalPost,
      comments: modalPost.comments.filter(
        (comment: any) => comment._id !== commentId
      ),
    });
  };
  const handleLeaveComment = (
    event: React.FormEvent<EventTarget>,
    postId: string,
    postUserId: string,
    postPicture: string
  ) => {
    event.preventDefault();
    dispatch(
      leaveComment(
        postId,
        {
          comment: parsingMentionTag(commentValue.comment),
          commentUserId: authUser._id,
          commentUserName: authUser.name,
        },
        postUserId,
        authUser.name,
        postPicture
      )
    );
    setModalPost({
      ...modalPost,
      comments: [
        ...modalPost.comments,
        {
          _id: new Date(),
          commentUserId: authUser._id,
          commentUserName: authUser.name,
          comment: parsingMentionTag(commentValue.comment),
        },
      ],
    });

    if (mentionUsers.length > 0) {
      dispatch(
        mentionUser(
          modalPost._id,
          authUser.name,
          modalPost.picture,
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
  const handleLikePost = (
    postId: string,
    postUserId: string,
    postPicture: string
  ) => {
    dispatch(
      likePost(postId, authUser._id, postUserId, authUser.name, postPicture)
    );
    const likedPost = modalPost?.likes?.findIndex(
      (id: string) => id === authUser._id
    );
    if (likedPost === -1) {
      setModalPost({ ...modalPost, likes: [...modalPost.likes, authUser._id] });
    } else {
      const likes = modalPost.likes.filter(
        (user: string) => user !== authUser._id
      );
      setModalPost({ ...modalPost, likes });
    }
  };
  const handleValueComment = (
    event: any,
    newValue: string,
    newPlainTextValue: string,
    mentions: MentionItem[]
  ) => {
    setCommentValue({ ...commentValue, comment: event.target.value });
    setMentionUsers(mentions.map((mention) => mention.id));
  };
  const handleCloseModal = () => {
    setIsUserPostModalOpen(false);
    setModalPost(null);
    setCommentValue({
      comment: "",
      commentUserId: "",
      commentUserName: "",
    });
  };
  const handleOpenModal = async (id: string) => {
    if (!id) return;
    setIsUserPostModalOpen(true);
    const notificationPost = await api.getNotificationPost(id);
    setModalPost(notificationPost.data);
    setIsOpen(false);
  };
  const handleStateNotification = () => {
    setIsOpen((prev) => !prev);
    if (notificationsCount && isOpen) dispatch(readNotifications(authUser._id));
  };
  const handleDeleteNotifications = () => {
    dispatch(deleteNotifications(authUser._id));
  };
  const handleClickHashtag = (hashtag: string) => {
    const removeHashtag = hashtag.replace("#", "");
    push(`/explore/hashtags/${removeHashtag}`);
  };
  const handleClickUserMention = (username: string) => {
    const removeText = username.replace("@", "");
    push(`/user/search/${removeText}`);
  };
  useEffect(() => {
    const handleClickPostInfo = (e: any) => {
      if (
        isOpen &&
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target)
      )
        setIsOpen(false);
      if (notificationsCount && isOpen)
        dispatch(readNotifications(authUser._id));
    };
    document.addEventListener("mousedown", handleClickPostInfo);
    return () => document.removeEventListener("mousedown", handleClickPostInfo);
  }, [isOpen]);

  useEffect(() => {
    const count = authUser.notifications?.filter(
      (data: any) => data.read === false
    ).length;
    setNotificationsCount(count || 0);
  }, [authUser]);
  return (
    <>
      <div className="relative" ref={dropDownRef}>
        <div className="cursor-pointer hover:bg-purple-400 p-2 rounded-full">
          <MdOutlineNotificationsNone
            size={30}
            onClick={handleStateNotification}
          />
        </div>
        {notificationsCount ? (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/8 -translate-y-1/8 bg-red-600 rounded-full border border-white">
            {notificationsCount}
          </span>
        ) : null}
        {isOpen ? (
          <div className="absolute -bottom-50 -left-28 xl:-left-40 bg-white text-black border-purple-500 border z-50 h-48 w-[300px] xl:h-[320px] xl:w-[400px] overflow-auto">
            {authUser.notifications?.length ? (
              <div className="flex justify-end p-2">
                <p
                  className="cursor-pointer"
                  onClick={handleDeleteNotifications}
                >
                  Delete all
                </p>
              </div>
            ) : null}
            {authUser.notifications?.length ? (
              authUser.notifications?.map((data: Notifications) => (
                <div
                  key={data._id}
                  className={`flex items-center p-2 border-2 cursor-pointer w-full ${
                    data.read && "bg-gray-400"
                  }`}
                  onClick={() => handleOpenModal(data.postId)}
                >
                  <div className="flex justify-evenly items-center w-full">
                    <p className="font-bold mr-2">{data.sender} </p>
                    <p className="mr-2">{data.notificationType}</p>
                    {data.image && (
                      <div className="w-10 h-10">
                        <CloudinaryImage image={data.image} />
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center p-5 border-t border-purple-500">
                <p>No notifications</p>
              </div>
            )}
          </div>
        ) : null}
      </div>
      <UserPostModal
        isUserPostModalOpen={isUserPostModalOpen}
        handleCloseModal={handleCloseModal}
        modalPost={modalPost}
        handleLikePost={handleLikePost}
        handleValueComment={handleValueComment}
        commentValue={commentValue}
        authUser={authUser}
        handleLeaveComment={handleLeaveComment}
        handleDeleteUserComment={handleDeleteUserComment}
        handleClickHashtag={handleClickHashtag}
        handleClickUserMention={handleClickUserMention}
      />
    </>
  );
}

export default Notification;
