import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";

function Header() {
  const [searchValue, setSearchValue] = useState<string>("");
  const handleSearchBar = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchValue(event.target.value);
  };

  return (
    <header className="w-full h-16 border-b-purple-800 border-b-2 bg-purple-500 text-white">
      <div className="max-w-7xl flex justify-between h-full items-center mx-auto p-3 xl:p-0">
        <h1 className="font-bold">VCMemories</h1>
        <div>
          <div className="flex justify-center items-center bg-white rounded-lg p-1 text text-black outline-1 outline outline-purple-900 focus-within:outline-[3px]">
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
        <div>userInfo</div>
      </div>
    </header>
  );
}

export default Header;
