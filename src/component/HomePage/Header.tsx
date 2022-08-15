import React, { useEffect, useRef, useState } from "react";
import SearchBar from "./Header/SearchBar";
import UserProfile from "./Header/UserProfile";
import { MdOutlineAddPhotoAlternate, MdSearch } from "react-icons/md";
import { RootState, useAppDispatch } from "../../reducers/store";
import { openPostModal } from "../../actions/modalAction";
import { useInternalRouter } from "../../pages/routing";
import Notification from "./Header/Notification";
import { getUserInfo } from "../../actions/authAction";
import { useSelector } from "react-redux";
import { Image } from "cloudinary-react";
const defaultProfilePicture =
  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
interface RecentSearchHistory {
  name: string;
  profileImg: string;
  userId: string;
}
function Header() {
  const navigate = useInternalRouter();
  const [searchValue, setSearchValue] = useState<string>("");
  const [mobileSearchValue, setMobileSearchValue] = useState<string>("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState<boolean>(false);
  const [isSearchResultOpen, setIsSearchResultOpen] = useState<boolean>(false);
  const [recentSearchHistory, setRecentSearchHistory] = useState<
    RecentSearchHistory[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchResultRef = useRef(
    null
  ) as unknown as React.MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
  const allUsers = useSelector((state: RootState) => state.allUsers);

  const handleClickMobileSearch = () => {
    setIsMobileSearchOpen((prev) => !prev);
    setMobileSearchValue("");

    const searchHistory = JSON.parse(localStorage.getItem("recent")) || [];
    setRecentSearchHistory(searchHistory);
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
    setSearchValue("");
  };

  const handleDeleteSearchHistory = (userId: string) => {
    const searchHistory = JSON.parse(localStorage.getItem("recent"));
    const deleteHistory = searchHistory.filter(
      (history: RecentSearchHistory) => history.userId !== userId
    );

    setRecentSearchHistory(deleteHistory);
    localStorage.setItem("recent", JSON.stringify(deleteHistory));
  };

  const handleSearchBar = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setIsSearchResultOpen(true);
    setSearchValue(event.target.value);
  };

  const handleFocusSearchBar = () => {
    setIsLoading(true);
    setIsSearchResultOpen(true);
    const searchHistory = JSON.parse(localStorage.getItem("recent")) || [];
    setRecentSearchHistory(searchHistory);
    setIsLoading(false);
  };

  const handleClickSearchingUser = (
    name: string,
    profileImg: string,
    userId: string
  ) => {
    navigate.push(`/user/search/${name}`);
    const searchHistory = JSON.parse(localStorage.getItem("recent")) || [];
    const findIndex = searchHistory?.findIndex(
      (history: RecentSearchHistory) => history.name === name
    );
    if (findIndex !== -1) return;
    const historyData = {
      name,
      profileImg,
      userId,
    };
    searchHistory.push(historyData);
    localStorage.setItem("recent", JSON.stringify(searchHistory));
    setIsSearchResultOpen(false);
    setIsMobileSearchOpen(false);
  };

  useEffect(() => {
    const checkAuth = localStorage.getItem("profile") ?? "";
    if (!checkAuth) return navigate.push("/auth");
    const isAuthenticated = JSON.parse(localStorage.getItem("profile") || "");
    dispatch(getUserInfo(isAuthenticated.user._id));
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutSide = (e: any) => {
      if (
        isSearchResultOpen &&
        searchResultRef.current &&
        !searchResultRef.current.contains(e.target)
      )
        setIsSearchResultOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, [isSearchResultOpen]);

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
            handleFocusSearchBar={handleFocusSearchBar}
            isSearchResultOpen={isSearchResultOpen}
            searchResultRef={searchResultRef}
            recentSearchHistory={recentSearchHistory}
            handleDeleteSearchHistory={handleDeleteSearchHistory}
            isLoading={isLoading}
          />
          <div className="flex justify-center items-center">
            <div className="cursor-pointer hover:bg-purple-400 p-2 rounded-full lg:hidden">
              <MdSearch size={30} onClick={handleClickMobileSearch} />
            </div>
            <div className="cursor-pointer hover:bg-purple-400 p-2 rounded-full">
              <MdOutlineAddPhotoAlternate
                size={30}
                onClick={handleCreatePost}
              />
            </div>
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
            {mobileSearchValue.length ? (
              allUsers
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
                    onClick={() =>
                      handleClickSearchingUser(
                        user.name,
                        user.profilePicture,
                        user._id
                      )
                    }
                  >
                    <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                      {user.profilePicture === defaultProfilePicture ? (
                        <img
                          src={user.profilePicture}
                          alt="userProfilePicture"
                        />
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
                ))
            ) : (
              <div className="text-black w-full h-full">
                <div className="h-8 w-full p-1">
                  <p className="text-center font-bold">Recent search history</p>
                </div>
                <div>
                  {recentSearchHistory.length > 0 ? (
                    recentSearchHistory.map((history) => (
                      <div
                        key={history.userId}
                        className="flex items-center justify-between cursor-pointer  text-black px-2 py-1"
                      >
                        <div
                          className="flex items-center flex-1"
                          onClick={() =>
                            handleClickSearchingUser(
                              history.name,
                              history.profileImg,
                              history.userId
                            )
                          }
                        >
                          <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                            {history.profileImg === defaultProfilePicture ? (
                              <img
                                src={history.profileImg}
                                alt="userProfilePicture"
                              />
                            ) : (
                              <Image
                                cloudName={
                                  process.env.REACT_APP_CLOUDINARY_USERNAME
                                }
                                publicId={history.profileImg}
                                className="w-full h-full"
                                crop="scale"
                              />
                            )}
                          </div>
                          <h2 className="font-bold text-center">
                            {history.name}
                          </h2>
                        </div>
                        <div
                          className="cursor-pointer hover:font-bold"
                          onClick={() =>
                            handleDeleteSearchHistory(history.userId)
                          }
                        >
                          <p>X</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="w-full h-full flex justify-center items-center">
                      <p>No search history</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
