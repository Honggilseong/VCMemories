import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";

interface Props {
  handleSearchBar: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
}

function SearchBar({ handleSearchBar, searchValue }: Props) {
  return (
    <div>
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
    </div>
  );
}

export default SearchBar;
