import React, { useState } from "react";
import Header from "../component/HomePage/Header";
import Body from "../component/ProfilePage/Body";
import { useInternalRouter } from "./routing";

function ProfilePage() {
  const { push } = useInternalRouter();
  const [isFollowRequestsModalOpen, setIsFollowRequestsModalOpen] =
    useState<boolean>(false);
  const handleClickSettings = () => {
    push("/usersettings");
  };
  const handleOpenFollowRequests = () => {
    setIsFollowRequestsModalOpen(true);
  };
  return (
    <div>
      <Header />
      <Body
        handleClickSettings={handleClickSettings}
        handleOpenFollowRequests={handleOpenFollowRequests}
        setIsFollowRequestsModalOpen={setIsFollowRequestsModalOpen}
        isFollowRequestsModalOpen={isFollowRequestsModalOpen}
      />
    </div>
  );
}

export default ProfilePage;
