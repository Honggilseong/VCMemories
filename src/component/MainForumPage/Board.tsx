import React from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { BoardPost } from "../../actions/boardPostDispatch";
import useWindowSize from "../../hooks/useWindowSize";
import Table from "./Table";
interface Props {
  handleClickCategory: (category: string) => void;
  category: string;
  boardPosts: BoardPost[];
}

function Board({ handleClickCategory, category, boardPosts }: Props) {
  const { width } = useWindowSize();
  return (
    <section className="w-full xl:max-w-[900px]">
      <nav className="flex">
        <div
          className={`border p-2 cursor-pointer ${
            category === "all" && "bg-purple-500 text-white"
          }`}
          onClick={() => handleClickCategory("all")}
        >
          <p>All</p>
        </div>
        <div
          className={`border p-2 cursor-pointer ${
            category === "Unity" && "bg-purple-500 text-white"
          }`}
          onClick={() => handleClickCategory("Unity")}
        >
          <p>Unity</p>
        </div>
        <div
          className={`border p-2 cursor-pointer ${
            category === "Blender" && "bg-purple-500 text-white"
          }`}
          onClick={() => handleClickCategory("Blender")}
        >
          <p>Blender</p>
        </div>
        <div
          className={`border p-2 cursor-pointer ${
            category === "Question" && "bg-purple-500 text-white"
          }`}
          onClick={() => handleClickCategory("Question")}
        >
          <p>Question</p>
        </div>
        <div
          className={`border p-2 cursor-pointer ${
            category === "Tips" && "bg-purple-500 text-white"
          }`}
          onClick={() => handleClickCategory("Tips")}
        >
          <p>Tips</p>
        </div>
        <div
          className={`border p-2 cursor-pointer ${
            category === "etc" && "bg-purple-500 text-white"
          }`}
          onClick={() => handleClickCategory("etc")}
        >
          <p>etc</p>
        </div>
      </nav>
      <div className="flex w-full border-b border-purple-500">
        <div className="flex-[0.7] flex items-center justify-start"></div>
        <div className="flex-[0.1] flex items-center justify-center">
          <p className="font-bold text-xs xl:text-sm">
            {width <= 1280 ? "Name" : "Username"}
          </p>
        </div>
        <div className="flex-[0.05] flex items-center justify-center">
          <FaRegThumbsUp size={15} />
        </div>
        <div className="flex-[0.1] flex items-center justify-center">
          <p className="font-bold text-xs xl:text-sm">Date</p>
        </div>
        <div className="flex-[0.05] flex items-center justify-center">
          <p className="font-bold text-xs xl:text-sm">Views</p>
        </div>
      </div>
      <Table boardPosts={boardPosts} />
    </section>
  );
}

export default Board;
