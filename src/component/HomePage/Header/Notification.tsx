import { useEffect, useRef, useState } from "react";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import {
  deleteNotifications,
  readNotifications,
} from "../../../actions/authAction";
import { useAppDispatch } from "../../../reducers/store";
export interface Notifications {
  _id: string;
  read: boolean;
  sender: string;
  notificationType: string;
}
function Notification() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notificationsCount, setNotificationsCount] = useState<number>(0);
  const user = useSelector((state: RootState) => state.auth);
  const getUser = JSON.parse(localStorage.getItem("profile") || "");
  const dropDownRef = useRef(
    null
  ) as unknown as React.MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();

  const handleStateNotification = () => {
    setIsOpen((prev) => !prev);
    if (notificationsCount && isOpen)
      dispatch(readNotifications(getUser.user._id));
  };
  const handleDeleteNotifications = () => {
    dispatch(deleteNotifications(getUser.user._id));
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
        dispatch(readNotifications(getUser.user._id));
    };
    document.addEventListener("mousedown", handleClickPostInfo);
    return () => document.removeEventListener("mousedown", handleClickPostInfo);
  }, [isOpen]);

  useEffect(() => {
    const count = user.notifications?.filter(
      (data: any) => data.read === false
    ).length;
    setNotificationsCount(count || 0);
  }, [user]);
  return (
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
        <div className="absolute -bottom-50 -left-20 bg-white text-black border-purple-500 border z-50 w-60">
          {user.notifications?.length ? (
            <div className="flex justify-end p-2">
              <p className="cursor-pointer" onClick={handleDeleteNotifications}>
                Delete all
              </p>
            </div>
          ) : null}
          {user.notifications?.length ? (
            user.notifications?.map((data: any) => (
              <div
                key={data._id}
                className={`flex items-center p-3 border-2 cursor-pointer ${
                  data.read && "bg-gray-400"
                }`}
              >
                <div className="flex">
                  <p className="font-bold mr-2">{data.sender} </p>
                  <p className="mr-2">{data.notificationType}</p>
                  {data.notificationType === "liked" && <p>your post</p>}
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center p-5 border-t border-purple-500">
              <p>There's no notifications</p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Notification;
