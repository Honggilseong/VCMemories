import React, { useEffect, useState } from "react";
import SearchBar from "./Header/SearchBar";
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
        <SearchBar
          handleSearchBar={handleSearchBar}
          searchValue={searchValue}
        />
        <UserProfile user={user} />
      </div>
    </header>
  );
}

export default Header;
