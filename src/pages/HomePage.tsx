import { useEffect } from "react";
import { getPosts } from "../actions/postAction";
import Body from "../component/HomePage/Body";
import Header from "../component/HomePage/Header";

import { useAppDispatch } from "../reducers/store";

function HomePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);
  return (
    <div>
      <Header />
      <Body />
    </div>
  );
}

export default HomePage;
