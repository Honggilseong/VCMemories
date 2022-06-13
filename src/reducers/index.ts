import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./authReducers";
import modalReducer from "./modalReducers";
import postReducer from "./postReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
  post: postReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
