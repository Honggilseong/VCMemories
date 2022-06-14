import { postActionDispatch } from "../actions/postActionDispatch";
import { CREATE_POST } from "../actions/postActionDispatch";

interface PostData {
  title: string;
  message: string;
  tags: string;
  picture: string;
  profilePicture: string;
}
interface InitialState {
  post: PostData[];
}
const initialState = {
  post: [],
};

const PostReducer = (
  state: InitialState = initialState,
  action: postActionDispatch
) => {
  switch (action.type) {
    case CREATE_POST: {
      console.log("connected", action.payload, state);
      return { post: [...state.post, action.payload] };
    }

    default:
      return state;
  }
};
export default PostReducer;
