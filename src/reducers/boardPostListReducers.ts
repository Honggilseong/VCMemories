import {
  boardPostListDispatch,
  GET_BOARDPOST_LIST,
  BoardPostList,
  BoardPost,
} from "./../actions/boardPostListDispatch";

type BoardPostListState = BoardPostList;
const initialState: BoardPostListState = {
  boardPosts: [],
  pagination: { count: null, pageCount: null },
};

const boardPostListReducers = (
  state: BoardPostListState = initialState,
  action: boardPostListDispatch
) => {
  switch (action.type) {
    case GET_BOARDPOST_LIST: {
      return action.payload;
    }
    default:
      return state;
  }
};
export default boardPostListReducers;
