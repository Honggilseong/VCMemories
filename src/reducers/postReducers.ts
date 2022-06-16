import {
  DELETE_POST,
  GET_POSTS,
  postActionDispatch,
} from "../actions/postActionDispatch";
import { CREATE_POST } from "../actions/postActionDispatch";

interface PostData {
  _id: string;
  title: string;
  message: string;
  tags: string;
  picture: string;
  profilePicture: string;
  userId: string;
}
type PostsState = PostData[];
const initialState: PostsState = [];

const PostReducer = (
  state: PostsState = initialState,
  action: postActionDispatch
) => {
  switch (action.type) {
    case CREATE_POST: {
      console.log("createPost", action.payload, state);
      return [...state, action.payload];
    }
    case GET_POSTS: {
      console.log("getPosts", action.payload);
      return action.payload;
    }
    case DELETE_POST: {
      return state.filter((post) => post._id !== action.payload);
    }
    default:
      return state;
  }
};
export default PostReducer;
