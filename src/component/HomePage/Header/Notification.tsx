import { useState } from "react";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";

function Notification() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.auth);
  const handleStateNotification = () => [setIsOpen((prev) => !prev)];
  console.log(user);
  return (
    <div className="relative">
      <MdOutlineNotificationsNone
        size={30}
        className="cursor-pointer"
        onClick={handleStateNotification}
      />
      {user.notifications && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
          {user.notifications.length}
        </span>
      )}
      {isOpen && (
        <div className="absolute -bottom-10 -left-10 bg-white w-10 h-10 border-purple-500 border"></div>
      )}
    </div>
  );
}

export default Notification;
