import React, { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import UserProfile from "./Header/UserProfile";
interface User {
  name: string;
  token: string;
  email: string;
  profilePicture: string;
}

function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchBar = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchValue(event.target.value);
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
        <UserProfile user={user} />
      </div>
    </header>
  );
}

export default Header;
