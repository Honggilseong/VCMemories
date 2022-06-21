import React, { useEffect, useState } from "react";
import Header from "../component/HomePage/Header";
import Body from "../component/UserProfilePage/Body";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../reducers/store";
import { getSearchingUser } from "../actions/searchUserAction";

function UserProfilePage() {
  const { username } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getSearchingUser(username));
    console.log(username);
  }, []);
  return (
    <section>
      <Header />
      <Body />
    </section>
  );
}

export default UserProfilePage;
