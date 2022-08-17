import React from "react";
import { useParams } from "react-router-dom";

function Body() {
  const { hashtag } = useParams();
  return (
    <div className="w-full h-full">
      <div className="h-10 flex justify-center items-center">
        <h1 className="text-2xl font-bold">#{hashtag}</h1>
      </div>
    </div>
  );
}

export default Body;
