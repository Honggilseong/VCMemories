interface Props {
  handleClickSearchBoardPost: () => void;
  handleInputSearchValue: (e: any) => void;
  searchValue: string;
}

function BoardPostSearchBar({
  handleClickSearchBoardPost,
  handleInputSearchValue,
  searchValue,
}: Props) {
  return (
    <div className="flex justify-center mt-5">
      <input
        type="text"
        className="focus:outline-none p-1 border-2 rounded-lg focus:border-purple-500"
        placeholder="Search"
        value={searchValue}
        name="search"
        onChange={handleInputSearchValue}
      />

      <button
        className="p-1 w-16 bg-purple-500 text-white rounded-lg ml-3"
        onClick={handleClickSearchBoardPost}
      >
        Search
      </button>
    </div>
  );
}

export default BoardPostSearchBar;
