import {
  Comment,
  DELETE_POST,
  GET_POSTS,
  LEAVE_COMMENT,
  LIKE_POST,
  postActionDispatch,
  RESET_POSTS,
} from "../actions/postActionDispatch";
import { CREATE_POST } from "../actions/postActionDispatch";

interface PostData {
  _id: string;
  title: string;
  message: string;
  tags: string[];
  picture: string;
  profilePicture: string;
  userId: string;
  likes: string[];
  comments: Comment[];
}
type PostsState = PostData[];
const initialState: PostsState = [];

const PostReducer = (
  state: PostsState = initialState,
  action: postActionDispatch
) => {
  switch (action.type) {
    case CREATE_POST: {
      return [action.payload, ...state];
    }
    case GET_POSTS: {
      return action.payload;
    }
    case DELETE_POST: {
      return state.filter((post) => post._id !== action.payload);
    }
    case LIKE_POST: {
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    }
    case LEAVE_COMMENT: {
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    }
    case RESET_POSTS: {
      return initialState;
    }
    default:
      return state;
  }
};
export default PostReducer;
