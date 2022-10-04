import {
  BoardPost,
  boardPostDispatch,
  BOARDPOST_DELETE_COMMENT,
  BOARDPOST_DELETE_REPLY,
  BOARDPOST_EDIT_COMMENT,
  BOARDPOST_EDIT_REPLY,
  BOARDPOST_LEAVE_COMMENT,
  BOARDPOST_LEAVE_REPLY,
  BOARDPOST_LIKE,
  BOARDPOST_LIKE_COMMENT,
  BOARDPOST_LIKE_REPLY,
  GET_BOARDPOST,
} from "../actions/boardPostDispatch";

const initialState: BoardPost = {
  _id: "",
  title: "",
  username: "",
  content: "",
  category: "",
  userId: "",
  channel: "",
  views: 0,
  likes: [],
  updatedAt: undefined,
  createdAt: undefined,
  comments: [],
};
const boardPostReducers = (
  state: BoardPost = initialState,
  action: boardPostDispatch
) => {
  switch (action.type) {
    case GET_BOARDPOST: {
      return action.payload;
    }
    case BOARDPOST_LIKE_COMMENT:
    case BOARDPOST_LIKE_REPLY:
    case BOARDPOST_LEAVE_REPLY:
    case BOARDPOST_LEAVE_COMMENT:
    case BOARDPOST_DELETE_COMMENT:
    case BOARDPOST_DELETE_REPLY:
    case BOARDPOST_EDIT_REPLY: {
      return { ...state, comments: [...action.payload.comments] };
    }
    case BOARDPOST_EDIT_COMMENT: {
      const { commentId, editComment } = action.payload;
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment._id === commentId
            ? { ...comment, comment: editComment }
            : comment
        ),
      };
    }
    case BOARDPOST_LIKE: {
      return { ...state, likes: [...action.payload.likes] };
    }
    default:
      return state;
  }
};
export default boardPostReducers;
