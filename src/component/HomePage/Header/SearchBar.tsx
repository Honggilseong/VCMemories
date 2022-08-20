import { Image } from "cloudinary-react";
import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
const defaultProfilePicture =
  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

interface Props {
  handleSearchBar: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickSearchingUser: (
    name: string,
    profileImg: string,
    userId: string
  ) => void;
  handleClearSearchValue: () => void;
  handleFocusSearchBar: () => void;
  searchValue: string;
  isSearchResultOpen: boolean;
  searchResultRef: React.MutableRefObject<HTMLDivElement>;
  recentSearchHistory: { name: string; profileImg: string; userId: string }[];
  handleDeleteSearchHistory: (userId: string) => void;
  isLoading: boolean;
  handleSearchHashTag: (hashtag: string) => void;
  checkIfValidHashtag: (hashtag: string) => boolean;
}

function SearchBar({
  handleSearchBar,
  searchValue,
  handleClickSearchingUser,
  handleClearSearchValue,
  handleFocusSearchBar,
  isSearchResultOpen,
  searchResultRef,
  recentSearchHistory,
  handleDeleteSearchHistory,
  handleSearchHashTag,
  isLoading,
  checkIfValidHashtag,
}: Props) {
  const allUsers = useSelector((state: RootState) => state.allUsers);
  return (
    <div className="relative">
      <div
        className="hidden lg:flex justify-center items-center bg-white rounded-lg p-1 text text-black outline-1 outline outline-purple-900 focus-within:outline-[3px]"
        ref={searchResultRef}
      >
        <input
          type="text"
          className="rounded-lg outline-none"
          placeholder="Search accounts"
          onChange={handleSearchBar}
          value={searchValue}
          onFocus={handleFocusSearchBar}
        />
        {searchValue ? (
          <TiDeleteOutline
            color="black"
            size="20px"
            cursor="pointer"
            onClick={handleClearSearchValue}
          />
        ) : (
          <BiSearchAlt2 color="black" size="20px" cursor="pointer" />
        )}
      </div>
      {isSearchResultOpen && (
        <div
          className={`border absolute -bottom-[25rem] -left-12 rounded-lg w-[300px] overflow-auto bg-white ${
            checkIfValidHashtag(searchValue)
              ? "h-16 -bottom-[4rem] px-2"
              : "h-[400px]"
          }`}
          ref={searchResultRef}
        >
          {searchValue.length ? (
            checkIfValidHashtag(searchValue) ? (
              <div
                className="text-black cursor-pointer h-14 flex items-center"
                onClick={() => handleSearchHashTag(searchValue)}
              >
                <p className="text-2xl text-bold">{searchValue}</p>
              </div>
            ) : (
              allUsers
                .filter((user) =>
                  user.name
                    .toLowerCase()
                    .trim()
                    .includes(searchValue.toLowerCase().trim())
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
            )
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
                  <div className="w-full h-[360px] border flex justify-center items-center">
                    <p>No search history</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
