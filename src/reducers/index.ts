import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./authReducers";
import modalReducer from "./modalReducers";
import postReducer from "./postReducers";
import SearchUserReducer from "./searchUserReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  post: postReducer,
  searchUser: SearchUserReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
