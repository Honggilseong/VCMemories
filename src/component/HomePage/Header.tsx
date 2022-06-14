import React, { useEffect, useState } from "react";
import SearchBar from "./Header/SearchBar";
import UserProfile from "./Header/UserProfile";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useAppDispatch } from "../../reducers/store";
import { openModal } from "../../actions/modalAction";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";

interface User {
  name: string;
  token: string;
  email: string;
  profilePicture: string;
}

function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const modal = useSelector((state: RootState) => state.modal);
  const handleSearchBar = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchValue(event.target.value);
  };

  const handleCreatePost = () => {
    console.log(modal.isModalOpen);
    dispatch(openModal());
  };

  useEffect(() => {
    const isAuthenticated = JSON.parse(localStorage.getItem("profile") || "");
    if (!isAuthenticated) return;
    setUser(isAuthenticated.user);
  }, []);

  return (
    <header className="w-full h-16 border-b-purple-800 border-b-2 bg-purple-500 text-white">
      <div className="max-w-7xl flex justify-between h-full items-center mx-auto p-3 xl:p-0">
        <h1 className="font-bold">VCMemories</h1>
        <SearchBar
          handleSearchBar={handleSearchBar}
          searchValue={searchValue}
        />
        <div className="flex justify-center items-center">
          <MdOutlineAddPhotoAlternate
            size={30}
            className="cursor-pointer mr-4"
            onClick={handleCreatePost}
          />
          <UserProfile user={user} />
        </div>
      </div>
    </header>
  );
}

export default Header;