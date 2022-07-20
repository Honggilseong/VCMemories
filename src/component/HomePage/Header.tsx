import React, { useEffect, useRef, useState } from "react";
import SearchBar from "./Header/SearchBar";
import UserProfile from "./Header/UserProfile";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useAppDispatch } from "../../reducers/store";
import {
  openPostModal,
  openSearchResultsModal,
} from "../../actions/modalAction";
import { useInternalRouter } from "../../pages/routing";
import Notification from "./Header/Notification";
import { getUserInfo } from "../../actions/authAction";

interface User {
  name: string;
  token: string;
  email: string;
  profilePicture: string;
  _id: string;
}

function Header() {
  const getUser = JSON.parse(
    localStorage.getItem("profile") || '{"user": { "token": "" }}'
  );
  const navigate = useInternalRouter();
  if (!getUser.user.token) navigate.push("/auth");
  const [user, setUser] = useState<User>({
    name: "",
    token: "",
    email: "",
    profilePicture: "",
    _id: "",
  });
  const [searchValue, setSearchValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const isAuthenticated = JSON.parse(localStorage.getItem("profile") || "");
  const handleSearchBar = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    dispatch(openSearchResultsModal());
    setSearchValue(event.target.value);
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
    if (!isAuthenticated) return;
    setUser(isAuthenticated.user);
    window.addEventListener("storage", handleStorage, false);
    return () => {
      window.removeEventListener("storage", handleStorage, false);
    };
  }, []);
  const handleStorage = () => {
    setUser(isAuthenticated.user);
  };
  useEffect(() => {
    if (user._id) dispatch(getUserInfo(user._id));
  }, [user]);
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
        />
        <div className="flex justify-center items-center">
          <MdOutlineAddPhotoAlternate
            size={30}
            className="cursor-pointer mr-4"
            onClick={handleCreatePost}
          />
          <Notification />
          <UserProfile user={user} />
        </div>
      </div>
    </header>
  );
}

export default Header;
