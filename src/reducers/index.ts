import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./authReducers";
import modalReducer from "./modalReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  modal: modalReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
