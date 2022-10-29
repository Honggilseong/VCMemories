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
import { GetAllUsers } from "../../actions/allUsersActionDispatch";
import { v4 as uuidv4 } from "uuid";
import useWindowSize from "../../hooks/useWindowSize";

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
  const [popularUsers, setPopularUsers] = useState<GetAllUsers[]>([]);
  const searchResultRef = useRef(
    null
  ) as unknown as React.MutableRefObject<HTMLDivElement>;
  const effectRef = useRef(false);
  const dispatch = useAppDispatch();
  const allUsers = useSelector((state: RootState) => state.allUsers);
  const authUser = useSelector((state: RootState) => state.auth);
  const { push } = useInternalRouter();
  const { width } = useWindowSize();

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

  const handleFocusSearchBar = async () => {
    setIsSearchResultOpen(true);
    const searchHistory =
      (await JSON.parse(localStorage.getItem("recent"))) || [];
    setRecentSearchHistory(searchHistory);
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
  const handleSearchHashTag = (hashtag: string) => {
    const removeHashtag = hashtag.replace("#", "");
    if (removeHashtag.length === 0) return;
    push(`/explore/hashtags/${removeHashtag}`);
  };
  const checkIfValidHashtag = (hashtag: string) => {
    const regexExp = /^#[^ !@#$%^&*(),.?":{}|<>]*$/gi;
    return regexExp.test(hashtag);
  };
  useEffect(() => {
    const checkAuth = localStorage.getItem("profile") ?? "";
    if (!checkAuth) return;
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
  useEffect(() => {
    if (allUsers.length === 0 || effectRef.current === true) return;
    const getPopularUsers = async () => {
      setIsLoading(true);
      let copyAllUsers: GetAllUsers[] = await JSON.parse(
        JSON.stringify(allUsers)
      );
      let usersArray: GetAllUsers[] = [];
      copyAllUsers.sort(
        (user1: GetAllUsers, user2: GetAllUsers) =>
          user2.followers.length - user1.followers.length
      );
      for (let i = 0; usersArray.length < 4; i++) {
        if (!copyAllUsers[i]?.isPrivate) {
          usersArray.push(copyAllUsers[i]);
        }
      }
      setPopularUsers(usersArray);
      setIsLoading(false);
    };
    getPopularUsers();
    return () => {
      effectRef.current = true;
    };
  }, [allUsers]);
  useEffect(() => {
    if (width < 1024) setIsSearchResultOpen(false);
    if (width > 1024) setIsMobileSearchOpen(false);
  }, [width]);
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
            handleSearchHashTag={handleSearchHashTag}
            checkIfValidHashtag={checkIfValidHashtag}
            popularUsers={popularUsers}
          />
          <div className="flex justify-center items-center">
            <div className="cursor-pointer hover:bg-purple-400 p-2 rounded-full lg:hidden">
              <MdSearch size={30} onClick={handleClickMobileSearch} />
            </div>
            {authUser._id && (
              <>
                <div className="cursor-pointer hover:bg-purple-400 p-2 rounded-full">
                  <MdOutlineAddPhotoAlternate
                    size={30}
                    onClick={handleCreatePost}
                  />
                </div>
                <Notification />
              </>
            )}
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
              checkIfValidHashtag(mobileSearchValue) ? (
                <div
                  className="text-black w-full h-full "
                  onClick={() => handleSearchHashTag(mobileSearchValue)}
                >
                  <p className="text-2xl font-bold w-full cursor-pointer text-center">
                    {mobileSearchValue}
                  </p>
                </div>
              ) : (
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
                            cloudName={
                              process.env.REACT_APP_CLOUDINARY_USERNAME
                            }
                            publicId={user.profilePicture}
                            className="w-full h-full"
                            crop="scale"
                          />
                        )}
                      </div>
                      <h2 className="font-bold text-center">{user.name}</h2>
                    </div>
                  ))
              )
            ) : (
              <div className="text-black w-full h-full">
                <div>
                  {recentSearchHistory.length > 0 ? (
                    <div>
                      <div className="h-8 w-full p-1">
                        <p className="text-center font-bold">
                          Recent search history
                        </p>
                      </div>
                      {recentSearchHistory.map((history) => (
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
                      ))}
                    </div>
                  ) : (
                    <div className="scrollbar-hide">
                      <div className="h-8 w-full p-1">
                        <p className="text-center font-bold">Popular users</p>
                      </div>
                      <div className="w-full h-[360px] border flex flex-col">
                        {isLoading ? (
                          <p>Loading..</p>
                        ) : (
                          popularUsers?.map((user: any) => (
                            <div
                              key={uuidv4()}
                              className="flex items-center cursor-pointer text-black px-2 py-1"
                              onClick={() =>
                                handleClickSearchingUser(
                                  user.name,
                                  user.profilePicture,
                                  user._id
                                )
                              }
                            >
                              <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                                {user.profilePicture ===
                                defaultProfilePicture ? (
                                  <img
                                    src={user.profilePicture}
                                    alt="userProfilePicture"
                                  />
                                ) : (
                                  <Image
                                    cloudName={
                                      process.env.REACT_APP_CLOUDINARY_USERNAME
                                    }
                                    publicId={user.profilePicture}
                                    className="w-full h-full"
                                    crop="scale"
                                  />
                                )}
                              </div>
                              <p className="font-bold">{user.name}</p>
                            </div>
                          ))
                        )}
                      </div>
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
