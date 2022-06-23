import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";

interface Props {
  handleSearchBar: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickSearchingUser: (name: string) => void;
  searchValue: string;
}

function SearchBar({
  handleSearchBar,
  searchValue,
  handleClickSearchingUser,
}: Props) {
  const allUsers = useSelector((state: RootState) => state.allUsers);
  const modal = useSelector((state: RootState) => state.modal);
  return (
    <div className="relative">
      <div className="hidden lg:flex justify-center items-center bg-white rounded-lg p-1 text text-black outline-1 outline outline-purple-900 focus-within:outline-[3px]">
        <input
          type="text"
          className="rounded-lg outline-none"
          placeholder="Search accounts"
          onChange={handleSearchBar}
          value={searchValue}
        />
        <BiSearchAlt2 color="black" size="20px" cursor="pointer" />
      </div>
      {modal.isSearchResultsModalOpen && (
        <div className="border absolute -bottom-[18rem] -left-12 rounded-lg h-72 overflow-hidden w-[300px] bg-white ">
          {allUsers
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
                onClick={() => handleClickSearchingUser(user.name)}
              >
                <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                  <img
                    src={user.profilePicture}
                    alt="userProfilePicture"
                    height={64}
                    width={64}
                  />
                </div>
                <h2 className="font-bold text-center">{user.name}</h2>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
