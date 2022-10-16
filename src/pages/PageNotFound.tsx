import React from "react";
import { useInternalRouter } from "./routing";
const pageNotFoundImage = require("../images/404Pageimg.png");

function PageNotFound() {
  const { push } = useInternalRouter();
  const handleClickMainPage = () => {
    push("/");
  };
  const handleClickForumPage = () => {
    push("/forum/vrchat");
  };
  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col">
      <div className="w-[300px] xl:w-[600px]">
        <img src={pageNotFoundImage} alt="pageNotFoundImage" />
      </div>
      <h1 className="font-bold text-2xl xl:text-4xl my-5 text-purple-500">
        VCMemories
      </h1>
      <h2 className="font-bold text-2xl xl:text-4xl mb-5">
        Error 404 - Page Not Found
      </h2>
      <p className="text-lg xl:text-2xl text-center">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-2">
        <button
          className="bg-purple-500 p-2 xl:w-[200px] rounded-lg text-white mt-5"
          onClick={handleClickMainPage}
        >
          Main page
        </button>
        <button
          className="bg-purple-500 p-2 xl:w-[200px] rounded-lg text-white mt-5"
          onClick={handleClickForumPage}
        >
          Forum page
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
