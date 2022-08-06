import React, { useEffect, useRef, useState } from "react";
import SearchBar from "./Header/SearchBar";
import UserProfile from "./Header/UserProfile";
import { MdOutlineAddPhotoAlternate, MdSearch } from "react-icons/md";
import { RootState, useAppDispatch } from "../../reducers/store";
import {
  openPostModal,
  openSearchResultsModal,
} from "../../actions/modalAction";
import { useInternalRouter } from "../../pages/routing";
import Notification from "./Header/Notification";
import { getUserInfo } from "../../actions/authAction";
import { useSelector } from "react-redux";
import { Image } from "cloudinary-react";
const defaultProfilePicture =
  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
function Header() {
  const navigate = useInternalRouter();
  const [searchValue, setSearchValue] = useState<string>("");
  const [mobileSearchValue, setMobileSearchValue] = useState<string>("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const allUsers = useSelector((state: RootState) => state.allUsers);

  const handleClickMobileSearch = () => {
    setIsMobileSearchOpen((prev) => !prev);
    setMobileSearchValue("");
  };
  const handleSearchBar = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    dispatch(openSearchResultsModal());
    setSearchValue(event.target.value);
  };
  const handleMobileSearchBar = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMobileSearchValue(event.target.value);
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
    if (!checkAuth) return navigate.push("/auth");
    const isAuthenticated = JSON.parse(localStorage.getItem("profile") || "");
    dispatch(getUserInfo(isAuthenticated.user._id));
  }, [dispatch]);
  return (
    <>
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
            <MdSearch
              size={30}
              className="cursor-pointer mr-4 lg:hidden"
              onClick={handleClickMobileSearch}
            />

            <MdOutlineAddPhotoAlternate
              size={30}
              className="cursor-pointer mr-4"
              onClick={handleCreatePost}
            />
            <Notification />
            <UserProfile />
          </div>
        </div>
      </header>
      {isMobileSearchOpen && (
        <div className="relative lg:hidden">
          <div className="h-10 border w-full">
            <input
              type="text"
              className="w-full h-full focus:outline-none px-3"
              placeholder="Search a user"
              onChange={handleMobileSearchBar}
            />
          </div>
          <div className="absolute h-[200px] overflow-auto w-full bg-white z-50">
            {allUsers
              .filter((user) =>
                user.name
                  .toLowerCase()
                  .trim()
                  .includes(mobileSearchValue.toLowerCase().trim())
              )
              .map((user) => (
                <div
                  key={user._id}
                  className="flex items-center cursor-pointer hover:bg-gray-200 text-black p-1"
                  onClick={() => handleClickSearchingUser(user.name)}
                >
                  <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                    {user.profilePicture === defaultProfilePicture ? (
                      <img src={user.profilePicture} alt="userProfilePicture" />
                    ) : (
                      <Image
                        cloudName={process.env.REACT_APP_CLOUDINARY_USERNAME}
                        publicId={user.profilePicture}
                        className="w-full h-full"
                        crop="scale"
                      />
                    )}
                  </div>
                  <h2 className="font-bold text-center">{user.name}</h2>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
