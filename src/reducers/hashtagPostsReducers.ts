import {
  GET_HASHTAG_POSTS,
  HashTagPost,
  hashtagPostsDispatch,
  HASHTAG_DELETE_COMMENT,
  HASHTAG_LEAVE_COMMENT,
  HASHTAG_LIKE_POST,
} from "../actions/hashtagPostsDispatch";

type PostsState = HashTagPost[];
const initialState: PostsState = [];
const HashtagPostsReducer = (
  state: PostsState = initialState,
  action: hashtagPostsDispatch
) => {
  switch (action.type) {
    case GET_HASHTAG_POSTS: {
      return action.payload;
    }
    case HASHTAG_LIKE_POST: {
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    }
    case HASHTAG_LEAVE_COMMENT: {
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    }
    case HASHTAG_DELETE_COMMENT: {
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
export default HashtagPostsReducer;
