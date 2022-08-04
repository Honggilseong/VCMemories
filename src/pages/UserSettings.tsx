import React, { useState } from "react";
import { useSelector } from "react-redux";
import { signOut } from "../actions/authAction";
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
  return (
    <div>
      <Header />
      <Body
        authUser={authUser}
        settingState={settingState}
        handleClickSignOut={handleClickSignOut}
        handleClickSettings={handleClickSettings}
      />
    </div>
  );
}

export default UserSettings;
