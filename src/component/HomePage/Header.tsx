import React from "react";

function Header() {
  return (
    <header className="w-full h-16 border-b-purple-800 border-b-2 bg-purple-500 text-white">
      <div className="max-w-7xl flex justify-between h-full items-center mx-auto p-3 xl:p-0">
        <h1 className="font-bold">VCMemories</h1>
        <div>search</div>
        <div>userInfo</div>
      </div>
    </header>
  );
}

export default Header;
