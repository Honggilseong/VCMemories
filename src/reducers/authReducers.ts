import { authActionDispatch, CREATE_USER } from "../actions/authActionDispatch";

interface InitialState {
  name: String;
  email: String;
  password: String;
}
const initialState = {
  name: "",
  email: "",
  password: "",
};
const AuthReducer = (
  state: InitialState = initialState,
  action: authActionDispatch
) => {
  switch (action.type) {
    case CREATE_USER:
      return state;
    default:
      return state;
  }
};
export default AuthReducer;
