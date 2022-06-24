import React, { useEffect } from "react";
import Header from "../component/HomePage/Header";
import Body from "../component/UserProfilePage/Body";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../reducers/store";
import { followUser, getSearchingUser } from "../actions/searchUserAction";

function UserProfilePage() {
  const { username } = useParams();
  const dispatch = useAppDispatch();
  const handleFollowUser = (searchUserId: string, userId: string) => {
    dispatch(followUser(searchUserId, userId));
  };
  useEffect(() => {
    dispatch(getSearchingUser(username));
  }, [dispatch, username]);
  return (
    <section>
      <Header />
      <Body handleFollowUser={handleFollowUser} />
    </section>
  );
}

export default UserProfilePage;
