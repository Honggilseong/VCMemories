import { combineReducers } from "@reduxjs/toolkit";
import allUsersReducer from "./allUsersReducers";

import authReducer from "./authReducers";
import modalReducer from "./modalReducers";
import postReducer from "./postReducers";
import searchUserReducer from "./searchUserReducers";
import hashtagPostsReducer from "./hashtagPostsReducers";
const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  post: postReducer,
  searchUser: searchUserReducer,
  allUsers: allUsersReducer,
  hashtagPosts: hashtagPostsReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
