import { useState } from "react";

function BoardPostSearchBar() {
  const [value, setValue] = useState<string>("");
  return (
    <div className="flex justify-center mt-5">
      <input
        type="text"
        className="focus:outline-none p-1 border-2 rounded-lg focus:!border-purple-500"
        placeholder="Search"
        value={value}
        name="search"
        onChange={(e) => setValue(e.target.value)}
      />

      <button className="p-1 w-16 bg-purple-500 text-white rounded-lg ml-3">
        Search
      </button>
    </div>
  );
}

export default BoardPostSearchBar;
