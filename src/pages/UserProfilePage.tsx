import { useEffect, useState } from "react";
import Header from "../component/HomePage/Header";
import Body from "../component/UserProfilePage/Body";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../reducers/store";
import { followUser, getSearchingUser } from "../actions/searchUserAction";
import * as api from "../api";
import { useSelector } from "react-redux";

function UserProfilePage() {
  const { username } = useParams();
  const dispatch = useAppDispatch();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const searchUserInfo = useSelector((state: any) => state.searchUser);
  const getUser = JSON.parse(localStorage.getItem("profile") || "");
  const handleFollowUser = (searchUserId: string, userId: string) => {
    if (!isFollowing) {
      try {
        api.sendNotification(searchUserId, {
          sender: getUser.user.name,
          notificationType: "Started following you",
        });
      } catch (error) {
        console.log(error, "UserProfile = > sendNotification");
      }
    }
    dispatch(followUser(searchUserId, userId));
  };
  useEffect(() => {
    const index = searchUserInfo.followers.findIndex(
      (id: string) => id === getUser.user._id
    );

    if (index === -1) {
      setIsFollowing(false);
    } else {
      setIsFollowing(true);
    }
  }, [searchUserInfo.followers]);
  useEffect(() => {
    dispatch(getSearchingUser(username));
  }, [dispatch, username]);
  return (
    <section>
      <Header />
      <Body
        handleFollowUser={handleFollowUser}
        isFollowing={isFollowing}
        searchUserInfo={searchUserInfo}
        getUser={getUser}
      />
    </section>
  );
}

export default UserProfilePage;
