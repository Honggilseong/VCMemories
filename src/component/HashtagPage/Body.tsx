import React from "react";
import { useParams } from "react-router-dom";
import { HashTagPost } from "../../actions/hashtagPostsDispatch";
import Posts from "./Posts";

interface Props {
  hashtagPosts: HashTagPost[];
}

function Body({ hashtagPosts }: Props) {
  const { hashtag } = useParams();
  console.log(hashtagPosts);
  return (
    <div className="w-full h-full">
      <div className="h-20 flex justify-center items-center flex-col">
        <h1 className="text-2xl font-bold">#{hashtag}</h1>
        <p className="font-bold text-gray-500">Recent Posts</p>
      </div>
      <Posts hashtagPosts={hashtagPosts} />
    </div>
  );
}

export default Body;
