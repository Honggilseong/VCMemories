import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getHashtagPosts } from "../actions/hashtagPostsAction";
import Body from "../component/HashtagPage/Body";
import Header from "../component/HomePage/Header";
import { useAppDispatch } from "../reducers/store";

function HashtagPage() {
  const { hashtag } = useParams();
  const dispatch = useAppDispatch();
  const hashtagPosts = useSelector((state: any) => state.hashtagPosts);
  useEffect(() => {
    dispatch(getHashtagPosts(hashtag));
  }, [hashtag, dispatch]);
  return (
    <div>
      <Header />
      <Body hashtagPosts={hashtagPosts} />
    </div>
  );
}

export default HashtagPage;
