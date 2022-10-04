import React, { useEffect, useRef, useState } from "react";
import Board from "./Board";
import { getAllBoardPosts } from "../../api";
import { BoardPost } from "../../actions/boardPostDispatch";
function Body() {
  const [category, setCategory] = useState<string>("all");
  const [boardPosts, setBoardPosts] = useState<BoardPost[]>([]);
  const effectRef = useRef(false);
  const handleClickCategory = (category: string) => {
    setCategory(category);
  };
  useEffect(() => {
    const getBoardPosts = async () => {
      if (effectRef.current === false) {
        const { data } = await getAllBoardPosts();
        setBoardPosts(data);
      }
    };
    getBoardPosts();
    return () => {
      effectRef.current = true;
    };
  }, []);
  return (
    <section className="w-full h-full mt-10">
      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-evenly">
        <div className="flex flex-col items-start mb-5 p-5 xl:p-0">
          <span className="font-bold">Channels</span>
          <div className="border border-purple-500 w-full mb-5" />
          <ul className="flex gap-4 flex-row xl:flex-col xl:gap-2">
            <li className="cursor-pointer hover:text-purple-500 text-lg">
              VRChat
            </li>
          </ul>
        </div>
        <div className="xl:max-w-[900px] w-full xl:flex xl:justify-center xl:items-center px-3 py-1">
          <Board
            handleClickCategory={handleClickCategory}
            category={category}
            boardPosts={boardPosts}
          />
        </div>
        <div></div>
      </div>
    </section>
  );
}

export default Body;
