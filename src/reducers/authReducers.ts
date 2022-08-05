import {
  authActionDispatch,
  CREATE_USER,
  DELETE_NOTIFICATIONS,
  DELETE_POST,
  DELETE_USER,
  GET_USER_INFO,
  LEAVE_COMMENT,
  LIKE_POST,
  Notifications,
  READ_NOTIFICATIONS,
  SIGN_IN,
  SIGN_OUT,
  UPLOAD_PROFILE_IMAGE,
  UserPosts,
} from "../actions/authActionDispatch";

interface InitialState {
  name: string;
  email: string;
  password: string;
  token?: string;
  profilePicture?: string;
  userPosts?: UserPosts[];
  followers?: string[];
  following?: string[];
  notifications?: Notifications[];
  _id: string;
}
const initialState = {
  name: "",
  email: "",
  password: "",
  token: "",
  _id: "",
};
const AuthReducer = (
  state: InitialState = initialState,
  action: authActionDispatch
) => {
  switch (action.type) {
    case CREATE_USER: {
      localStorage.setItem("profile", JSON.stringify(action.payload));
      return { ...state, userData: action.payload };
    }
    case SIGN_IN: {
      localStorage.setItem("profile", JSON.stringify(action.payload));
      return { ...state, userData: action.payload };
    }
    case SIGN_OUT: {
      localStorage.removeItem("profile");
      return { ...initialState };
    }
    case GET_USER_INFO: {
      return { ...state, ...action.payload };
    }
    case DELETE_POST: {
      let userPosts = state.userPosts;

      userPosts = userPosts?.filter((post) => post._id !== action.payload);
      return { ...state, userPosts };
    }
    case UPLOAD_PROFILE_IMAGE: {
      console.log("updated");
      return { ...state, profilePicture: action.payload };
    }
    case READ_NOTIFICATIONS: {
      return {
        ...state,
        notifications: state.notifications?.map((notification) =>
          !notification.read ? { ...notification, read: true } : notification
        ),
      };
    }
    case DELETE_NOTIFICATIONS: {
      console.log("Delete Notifications");
      return {
        ...state,
        notifications: [],
      };
    }
    case LEAVE_COMMENT: {
      const { _id } = action.payload;
      return {
        ...state,
        userPosts: state.userPosts?.map((post) =>
          post._id === _id ? action.payload : post
        ),
      };
    }
    case LIKE_POST: {
      return {
        ...state,
        userPosts: state.userPosts?.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    }
    case DELETE_USER: {
      localStorage.removeItem("profile");
      return { ...initialState };
    }
    default:
      return state;
  }
};
export default AuthReducer;
