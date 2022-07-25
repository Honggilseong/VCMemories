import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getAllUsers } from "../actions/allUsersAction";
import { getPosts } from "../actions/postAction";
import Body from "../component/HomePage/Body";
import Header from "../component/HomePage/Header";

import { useAppDispatch } from "../reducers/store";

function HomePage() {
  const dispatch = useAppDispatch();
  const effectRef = useRef(false);
  const authUser = useSelector((state: any) => state.auth);
  useEffect(() => {
    if (!authUser.name) return;
    if (effectRef.current === false) {
      dispatch(getPosts(authUser.following));
      dispatch(getAllUsers());
    }
    return () => {
      effectRef.current = true;
    };
  }, [authUser]);
  return (
    <div>
      <Header />
      <Body />
    </div>
  );
}

export default HomePage;
