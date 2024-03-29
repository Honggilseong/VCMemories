import {
  Comment,
  GET_POSTS,
  POST_LEAVE_COMMENT,
  POST_LIKE_POST,
  postActionDispatch,
  POST_DELETE_POST,
  RESET_POSTS,
  POST_DELETE_COMMENT,
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
  isEdit: boolean;
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
    case POST_DELETE_POST: {
      return state.filter((post) => post._id !== action.payload);
    }
    case POST_LIKE_POST: {
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    }
    case POST_LEAVE_COMMENT: {
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    }
    case RESET_POSTS: {
      return initialState;
    }
    case POST_DELETE_COMMENT: {
      const { postId, commentId } = action.payload;
      return state.map((post) =>
        post._id === postId
          ? {
              ...post,
              comments: post.comments.filter(
                (comment) => comment._id !== commentId
              ),
            }
          : post
      );
    }
    default:
      return state;
  }
};
export default PostReducer;
