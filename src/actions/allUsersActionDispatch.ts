export const GET_ALL_USERS = "GET_ALL_USERS";
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
export interface GetAllUsers {
  _id: string;
  email: string;
  name: string;
  profilePicture: string;
  userPosts: UserPosts[];
  followers: string[];
  following: string[];
  isPrivate: boolean;
}
export interface getAllUsers {
  type: typeof GET_ALL_USERS;
  payload: GetAllUsers[];
}

export type allUsersActionDispatch = getAllUsers;
