import {
  authActionDispatch,
  CREATE_USER,
  SIGN_IN,
} from "../actions/authActionDispatch";

interface InitialState {
  name: string;
  email: string;
  password: string;
  token?: string;
}
const initialState = {
  name: "",
  email: "",
  password: "",
  token: "",
};
const AuthReducer = (
  state: InitialState = initialState,
  action: authActionDispatch
) => {
  switch (action.type) {
    case CREATE_USER: {
      localStorage.setItem("profile", JSON.stringify(action.payload));
      return { ...state, userData: action.payload };
    }
    case SIGN_IN: {
      localStorage.setItem("profile", JSON.stringify(action.payload));
      return { ...state, userData: action.payload };
    }
    default:
      return state;
  }
};
export default AuthReducer;