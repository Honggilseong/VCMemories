import {
  searchUserActionDispatch,
  SEARCH_USER,
} from "./../actions/searchUserActionDispatch";

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
}
export interface GetSearchingUser {
  _id: string;
  email: string;
  name: string;
  profilePicture: string;
  userPosts: UserPosts[];
  followers: string[];
  following: string[];
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
};

const SearchUserReducer = (
  state: SearchUserState = initialState,
  action: searchUserActionDispatch
) => {
  switch (action.type) {
    case SEARCH_USER: {
      return action.payload;
    }
    default:
      return state;
  }
};
export default SearchUserReducer;
