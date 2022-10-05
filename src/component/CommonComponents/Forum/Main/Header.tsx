import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserInfo } from "../../../../actions/authAction";
import { useInternalRouter } from "../../../../pages/routing";
import { RootState, useAppDispatch } from "../../../../reducers/store";
const defaultProfilePicture =
  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
function Header() {
  const dispatch = useAppDispatch();
  const authUser = useSelector((state: RootState) => state.auth);
  const { push } = useInternalRouter();
  const location = useLocation();
  const handleClickUserInfo = () => {
    push(`/forum/userinfo/${authUser.name}`);
  };
  const handleClickLogo = () => {
    push("/forum/vrchat");
  };
  const handleClickSignIn = () => {
    push("/auth", { state: { from: location.pathname } });
  };
  useEffect(() => {
    const checkAuth = localStorage.getItem("profile") ?? "";
    if (!checkAuth) return;
    const isAuthenticated = JSON.parse(localStorage.getItem("profile") || "");
    dispatch(getUserInfo(isAuthenticated.user._id));
  }, [dispatch]);
  return (
    <header className="w-full h-16 border-b-purple-800 border-b-2 bg-purple-500 text-white">
      <div className="max-w-7xl flex justify-between h-full items-center mx-auto p-3 xl:p-0">
        <h1 className="cursor-pointer font-bold" onClick={handleClickLogo}>
          VCMemories
        </h1>
        {authUser.name ? (
          <div
            className="flex items-center justify-center"
            onClick={handleClickUserInfo}
          >
            <p className="mr-4 cursor-pointer hidden lg:block">
              {authUser.name}
            </p>
            <div className="rounded-full border-2 w-10 h-10 overflow-hidden cursor-pointer">
              <img src={defaultProfilePicture} alt="profileImage" />
            </div>
          </div>
        ) : (
          <div className="cursor-pointer" onClick={handleClickSignIn}>
            <p>Sign in</p>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
