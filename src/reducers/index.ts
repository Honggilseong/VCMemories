import { combineReducers } from "@reduxjs/toolkit";
import allUsersReducer from "./allUsersReducers";

import authReducer from "./authReducers";
import modalReducer from "./modalReducers";
import postReducer from "./postReducers";
import searchUserReducer from "./searchUserReducers";
import hashtagPostsReducer from "./hashtagPostsReducers";
import boardPostReducer from "./boardPostReducers";
import boardPostListReducer from "./boardPostListReducers";
const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  post: postReducer,
  searchUser: searchUserReducer,
  allUsers: allUsersReducer,
  hashtagPosts: hashtagPostsReducer,
  boardPost: boardPostReducer,
  boardPostList: boardPostListReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
