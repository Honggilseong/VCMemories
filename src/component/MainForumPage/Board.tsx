import React from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import useWindowSize from "../../hooks/useWindowSize";
import Table from "./Table";
interface Props {
  handleClickCategory: (category: string) => void;
  category: string;
}

function Board({ handleClickCategory, category }: Props) {
  const { width } = useWindowSize();
  return (
    <section className="w-full xl:max-w-[900px]">
      <nav className="flex w-full">
        <div
          className={`border p-2 cursor-pointer text-xs xl:text-base flex items-center ${
            category === "all" && "bg-purple-500 text-white"
          }`}
          onClick={() => handleClickCategory("all")}
        >
          <p>All</p>
        </div>
        <div
          className={`border p-2 cursor-pointer text-xs xl:text-base flex items-center ${
            category === "unity" && "bg-purple-500 text-white"
          }`}
          onClick={() => handleClickCategory("unity")}
        >
          <p>Unity</p>
        </div>
        <div
          className={`border p-2 cursor-pointer text-xs xl:text-base flex items-center ${
            category === "blender" && "bg-purple-500 text-white"
          }`}
          onClick={() => handleClickCategory("blender")}
        >
          <p>Blender</p>
        </div>
        <div
          className={`border p-2 cursor-pointer text-xs xl:text-base flex items-center ${
            category === "questions" && "bg-purple-500 text-white"
          }`}
          onClick={() => handleClickCategory("questions")}
        >
          <p>Questions</p>
        </div>
        <div
          className={`border p-2 cursor-pointer text-xs xl:text-base flex items-center ${
            category === "requests" && "bg-purple-500 text-white"
          }`}
          onClick={() => handleClickCategory("requests")}
        >
          <p>Requests</p>
        </div>
        <div
          className={`border p-2 cursor-pointer text-xs xl:text-base flex items-center ${
            category === "tips" && "bg-purple-500 text-white"
          }`}
          onClick={() => handleClickCategory("tips")}
        >
          <p>Tips</p>
        </div>
        <div
          className={`border p-2 cursor-pointer text-xs xl:text-base flex items-center ${
            category === "etc" && "bg-purple-500 text-white"
          }`}
          onClick={() => handleClickCategory("etc")}
        >
          <p>etc</p>
        </div>
      </nav>
      <div className="w-full border-b border-purple-500 hidden xl:flex gap-5">
        <div className="w-[550px] flex items-center justify-start"></div>
        <div className="flex items-center justify-center">
          <p className="font-bold text-xs xl:text-sm">
            {width <= 1280 ? "Name" : "Username"}
          </p>
        </div>
        <div className="ml-3 flex items-center justify-center">
          <FaRegThumbsUp size={15} />
        </div>
        <div className="ml-8 flex items-center justify-center">
          <p className="font-bold text-xs xl:text-sm">Date</p>
        </div>
        <div className="ml-11 flex items-center justify-center">
          <p className="font-bold text-xs xl:text-sm">Views</p>
        </div>
      </div>
      <Table category={category} />
    </section>
  );
}

export default Board;
