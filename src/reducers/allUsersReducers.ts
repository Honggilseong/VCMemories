import {
  allUsersActionDispatch,
  GET_ALL_USERS,
} from "../actions/allUsersActionDispatch";
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
export interface AllUsers {
  _id: string;
  email: string;
  name: string;
  profilePicture: string;
  userPosts: UserPosts[];
  followers: string[];
  following: string[];
}
type AllUsersState = AllUsers[];
const initialState: AllUsersState = [];

const AllUsersReducer = (
  state: AllUsersState = initialState,
  action: allUsersActionDispatch
) => {
  switch (action.type) {
    case GET_ALL_USERS: {
      return action.payload;
    }
    default:
      return state;
  }
};
export default AllUsersReducer;
