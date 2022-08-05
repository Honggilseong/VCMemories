import React, { useState } from "react";
import { useSelector } from "react-redux";
import { deleteUser, signOut } from "../actions/authAction";
import { resetPosts } from "../actions/postAction";
import Header from "../component/HomePage/Header";
import Body from "../component/UserSettings/Body";
import { RootState, useAppDispatch } from "../reducers/store";
import { useInternalRouter } from "./routing";

function UserSettings() {
  const [settingState, setSettingState] = useState<string>("accountSettings");
  const dispatch = useAppDispatch();
  const { push } = useInternalRouter();
  const authUser = useSelector((state: RootState) => state.auth);
  const handleClickSettings = (option: string) => {
    setSettingState(option);
  };
  const handleClickSignOut = () => {
    dispatch(signOut());
    dispatch(resetPosts());
    push("/auth");
  };
  const handleDeleteUser = () => {
    const localUserInfo = JSON.parse(localStorage.getItem("profile") || "");
    dispatch(deleteUser(authUser._id, localUserInfo.user._id));
    dispatch(resetPosts());
    push("/auth");
  };
  return (
    <div>
      <Header />
      <Body
        authUser={authUser}
        settingState={settingState}
        handleClickSignOut={handleClickSignOut}
        handleClickSettings={handleClickSettings}
        handleDeleteUser={handleDeleteUser}
      />
    </div>
  );
}

export default UserSettings;
