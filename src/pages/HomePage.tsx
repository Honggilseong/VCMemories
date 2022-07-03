import { useEffect, useRef } from "react";
import { getAllUsers } from "../actions/allUsersAction";
import { getPosts } from "../actions/postAction";
import Body from "../component/HomePage/Body";
import Header from "../component/HomePage/Header";

import { useAppDispatch } from "../reducers/store";

function HomePage() {
  const dispatch = useAppDispatch();
  const effectRef = useRef(false);
  useEffect(() => {
    if (effectRef.current === false) {
      dispatch(getPosts());
      dispatch(getAllUsers());
    }
    return () => {
      effectRef.current = true;
    };
  }, []);
  return (
    <div>
      <Header />
      <Body />
    </div>
  );
}

export default HomePage;
