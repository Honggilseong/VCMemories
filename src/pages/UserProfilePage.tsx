import { useEffect, useState } from "react";
import Header from "../component/HomePage/Header";
import Body from "../component/UserProfilePage/Body";
import { useParams } from "react-router-dom";
import { RootState, useAppDispatch } from "../reducers/store";
import { followUser, getSearchingUser } from "../actions/searchUserAction";
import * as api from "../api";
import { useSelector } from "react-redux";
import { sendFollowRequest } from "../actions/authAction";

function UserProfilePage() {
  const { username } = useParams();
  const dispatch = useAppDispatch();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchUserInfo = useSelector((state: any) => state.searchUser);
  const authUser = useSelector((state: RootState) => state.auth);

  const handleFollowUser = (searchUserId: string, userId: string) => {
    if (searchUserInfo.isPrivate) {
      const senderInfo = {
        username: authUser.name,
        userId: authUser._id,
        profileImage: authUser.profilePicture,
      };
      if (!isFollowing) {
        sendFollowRequest(searchUserId, senderInfo);
      } else {
        dispatch(followUser(searchUserId, userId));
      }
    } else {
      if (!isFollowing) {
        try {
          api.sendNotification(searchUserId, {
            sender: authUser.name,
            notificationType: "Started following you",
          });
        } catch (error) {
          console.log(error, "UserProfile = > sendNotification");
        }
      }
      dispatch(followUser(searchUserId, userId));
    }
  };

  useEffect(() => {
    const index = searchUserInfo.followers.findIndex(
      (id: string) => id === authUser._id
    );

    if (index === -1) {
      setIsFollowing(false);
    } else {
      setIsFollowing(true);
    }
  }, [searchUserInfo.followers]);
  useEffect(() => {
    setIsLoading(true);
    dispatch(getSearchingUser(username));
    setIsLoading(false);
  }, [dispatch, username]);
  return (
    <section>
      <Header />
      <Body
        handleFollowUser={handleFollowUser}
        isFollowing={isFollowing}
        searchUserInfo={searchUserInfo}
        isLoading={isLoading}
      />
    </section>
  );
}

export default UserProfilePage;
