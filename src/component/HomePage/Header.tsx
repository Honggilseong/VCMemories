import React, { useEffect, useRef, useState } from "react";
import SearchBar from "./Header/SearchBar";
import UserProfile from "./Header/UserProfile";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { RootState, useAppDispatch } from "../../reducers/store";
import {
  openPostModal,
  openSearchResultsModal,
} from "../../actions/modalAction";
import { useInternalRouter } from "../../pages/routing";
import Notification from "./Header/Notification";
import { getUserInfo } from "../../actions/authAction";
import { useSelector } from "react-redux";

function Header() {
  const navigate = useInternalRouter();
  const [searchValue, setSearchValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const authUser = useSelector((state: RootState) => state.auth);
  const handleSearchBar = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    dispatch(openSearchResultsModal());
    setSearchValue(event.target.value);
  };
  const handleClearSearchValue = () => {
    setSearchValue("");
  };
  const handleCreatePost = () => {
    dispatch(openPostModal());
  };

  const handleClickLogo = () => {
    navigate.push("/");
  };

  const handleClickSearchingUser = (name: string) => {
    navigate.push(`/user/search/${name}`);
  };
  useEffect(() => {
    const checkAuth = localStorage.getItem("profile") ?? "";
    if (!checkAuth) return;
    const isAuthenticated = JSON.parse(localStorage.getItem("profile") || "");
    dispatch(getUserInfo(isAuthenticated.user._id));
  }, [authUser]);
  return (
    <header className="w-full h-16 border-b-purple-800 border-b-2 bg-purple-500 text-white">
      <div className="max-w-7xl flex justify-between h-full items-center mx-auto p-3 xl:p-0">
        <h1 className="font-bold cursor-pointer" onClick={handleClickLogo}>
          VCMemories
        </h1>
        <SearchBar
          handleSearchBar={handleSearchBar}
          searchValue={searchValue}
          handleClickSearchingUser={handleClickSearchingUser}
          handleClearSearchValue={handleClearSearchValue}
        />
        <div className="flex justify-center items-center">
          <MdOutlineAddPhotoAlternate
            size={30}
            className="cursor-pointer mr-4 hidden xl:block"
            onClick={handleCreatePost}
          />
          <Notification />
          <UserProfile />
        </div>
      </div>
    </header>
  );
}

export default Header;
