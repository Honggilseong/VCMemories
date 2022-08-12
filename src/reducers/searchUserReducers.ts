import {
  FOLLOW_USER,
  SEARCH_LEAVE_COMMENT,
  SEARCH_LIKE_POST,
  searchUserActionDispatch,
  SEARCH_USER,
} from "./../actions/searchUserActionDispatch";
export interface Notifications {
  _id: string;
  read: boolean;
  sender: string;
  notificationType: string;
}
export interface UserPosts {
  title: string;
  picture: string;
  message: string;
  tags: string[];
  name: string;
  profilePicture: string;
  userId: string;
  likes: string[];
  _id: string;
  comments: Comment[];
}
export interface GetSearchingUser {
  name: string;
  email: string;
  profilePicture: string;
  userPosts: UserPosts[];
  followers: string[];
  following: string[];
  notifications: Notifications[];
  _id: string;
  isPrivate: boolean;
  userTitle: string;
}
type SearchUserState = GetSearchingUser;
const initialState: SearchUserState = {
  _id: "",
  email: "",
  name: "",
  profilePicture: "",
  userPosts: [],
  followers: [],
  following: [],
  notifications: [],
  isPrivate: false,
  userTitle: "",
};

const SearchUserReducer = (
  state: SearchUserState = initialState,
  action: searchUserActionDispatch
) => {
  switch (action.type) {
    case SEARCH_USER: {
      return action.payload;
    }
    case FOLLOW_USER: {
      return action.payload;
    }
    case SEARCH_LEAVE_COMMENT: {
      return {
        ...state,
        userPosts: state.userPosts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    }
    case SEARCH_LIKE_POST: {
      return {
        ...state,
        userPosts: state.userPosts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    }
    default:
      return state;
  }
};
export default SearchUserReducer;
