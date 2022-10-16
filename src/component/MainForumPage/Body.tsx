import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useInternalRouter } from "../../pages/routing";
import Board from "./Board";
function Body() {
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState<string>(
    searchParams.has("filter") ? searchParams.get("filter") : "all"
  );
  const { push } = useInternalRouter();
  const handleClickCategory = (category: string) => {
    setCategory(category);
    if (category === "all") {
      push("/forum/vrchat");
    } else {
      push({
        pathname: "/forum/vrchat",
        search: `?filter=${category}&page=1`,
      });
    }
  };
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
          />
        </div>
        <div></div>
      </div>
    </section>
  );
}

export default Body;
