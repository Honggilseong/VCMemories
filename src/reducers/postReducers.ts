import { postActionDispatch } from "../actions/postActionDispatch";
import { CREATE_POST } from "../actions/postActionDispatch";

interface InitialState {
  title: string;
  message: string;
  tags: string;
  picture: string;
}
const initialState = {
  title: "",
  message: "",
  tags: "",
  picture: "",
};

const PostReducer = (
  state: InitialState = initialState,
  action: postActionDispatch
) => {
  switch (action.type) {
    case CREATE_POST: {
      console.log("connected");
      return state;
    }

    default:
      return state;
  }
};
export default PostReducer;
