export const SEARCH_USER = "SEARCH_USER";
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
export interface getSearchingUser {
  type: typeof SEARCH_USER;
  payload: GetSearchingUser;
}

export type searchUserActionDispatch = getSearchingUser;
