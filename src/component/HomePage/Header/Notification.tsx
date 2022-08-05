import { useEffect, useRef, useState } from "react";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import {
  deleteNotifications,
  leaveComment,
  likePost,
  readNotifications,
} from "../../../actions/authAction";
import { useAppDispatch } from "../../../reducers/store";
import { Image } from "cloudinary-react";
import UserPostModal from "./Notification/UserPostModal";
import { Comment } from "../../../actions/postActionDispatch";
export interface Notifications {
  _id: string;
  read: boolean;
  sender: string;
  image?: string;
  notificationType: string;
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
  const authUser = useSelector((state: RootState) => state.auth);
  const dropDownRef = useRef(
    null
  ) as unknown as React.MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
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
          ...commentValue,
          commentUserId: authUser._id,
          commentUserName: authUser.name,
        },
        postUserId,
        authUser.name,
        postPicture
      )
    );
    const newComment = {
      _id: new Date(),
      commentUserId: authUser._id,
      commentUserName: authUser.name,
      comment: commentValue.comment,
    };
    setModalPost({
      ...modalPost,
      comments: [...modalPost.comments, newComment],
    });
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
  const handleValueComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentValue({ ...commentValue, comment: event.target.value });
    console.log(commentValue.comment);
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
  const handleOpenModal = (image: string) => {
    setIsUserPostModalOpen(true);
    const postIndex = authUser.userPosts?.findIndex(
      (post) => post.picture === image
    );
    setModalPost(authUser.userPosts[postIndex]);
    setIsOpen(false);
  };
  const handleStateNotification = () => {
    setIsOpen((prev) => !prev);
    if (notificationsCount && isOpen) dispatch(readNotifications(authUser._id));
  };
  const handleDeleteNotifications = () => {
    dispatch(deleteNotifications(authUser._id));
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
        <MdOutlineNotificationsNone
          size={30}
          className="cursor-pointer"
          onClick={handleStateNotification}
        />
        {notificationsCount ? (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full border border-white">
            {notificationsCount}
          </span>
        ) : null}
        {isOpen ? (
          <div className="absolute -bottom-50 -left-20 bg-white text-black border-purple-500 border z-50 max-w-md max-h-80 overflow-auto">
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
                  onClick={() => handleOpenModal(data.image)}
                >
                  <div className="flex justify-center items-center">
                    <p className="font-bold mr-2">{data.sender} </p>
                    <p className="mr-2">{data.notificationType}</p>
                    {data.image && (
                      <div className="w-10 h-10">
                        <Image
                          key={data.image}
                          cloudName={process.env.REACT_APP_CLOUDINARY_USERNAME}
                          publicId={data.image}
                          className="w-full h-full"
                          crop="scale"
                        />
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
      />
    </>
  );
}

export default Notification;
