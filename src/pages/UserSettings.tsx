import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  deleteAllFollowRequests,
  deleteUser,
  signOut,
  switchAccountState,
  updateUserBio,
} from "../actions/authAction";
import { resetPosts } from "../actions/postAction";
import Header from "../component/HomePage/Header";
import Body from "../component/UserSettings/Body";
import { RootState, useAppDispatch } from "../reducers/store";
import { useInternalRouter } from "./routing";

function UserSettings() {
  const [settingState, setSettingState] = useState<string>("accountSettings");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenBio, setIsOpenBio] = useState<boolean>(false);
  const [bioValue, setBioValue] = useState<string>("");
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
    localStorage.removeItem("recent");
  };
  const handleDeleteUser = () => {
    const localUserInfo = JSON.parse(localStorage.getItem("profile") || "");
    dispatch(deleteUser(authUser._id, localUserInfo.user._id));
    dispatch(resetPosts());
    push("/auth");
  };
  const handleClickAccountState = async () => {
    if (isLoading) return;
    setIsLoading(true);
    if (authUser.followRequests.length && authUser.isPrivate)
      await dispatch(deleteAllFollowRequests(authUser._id));
    await dispatch(switchAccountState(authUser._id));
    setIsLoading(false);
  };
  const handleClickBio = () => {
    if (!isOpenBio) setBioValue(authUser.bio);
    setIsOpenBio((prev) => !prev);
  };
  const handleChangeBioValue = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setBioValue(event.target.value);
  };
  const handleClickUpdateBio = async () => {
    if (isLoading) return;
    setIsOpenBio(false);
    if (authUser.bio === bioValue) return;
    setIsLoading(true);
    await dispatch(updateUserBio(authUser._id, bioValue));
    setIsLoading(false);
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
        handleClickAccountState={handleClickAccountState}
        handleClickBio={handleClickBio}
        isOpenBio={isOpenBio}
        handleChangeBioValue={handleChangeBioValue}
        bioValue={bioValue}
        handleClickUpdateBio={handleClickUpdateBio}
      />
    </div>
  );
}

export default UserSettings;
