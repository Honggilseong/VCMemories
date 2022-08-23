import {
  ACCEPT_FOLLOW_REQUEST,
  authActionDispatch,
  CREATE_USER,
  DELETE_NOTIFICATIONS,
  USER_DELETE_POST,
  DELETE_USER,
  GET_USER_INFO,
  Notifications,
  READ_NOTIFICATIONS,
  SIGN_IN,
  SIGN_OUT,
  UPLOAD_PROFILE_IMAGE,
  DELETE_FOLLOW_REQUEST,
  UserPosts,
  SWITCH_ACCOUNT_STATE,
  DELETE_ALL_FOLLOW_REQUESTS,
  USER_LEAVE_COMMENT,
  USER_LIKE_POST,
  USER_DELETE_COMMENT,
  EDIT_USER_POST,
  UPDATE_USER_BIO,
} from "../actions/authActionDispatch";
interface FollowRequests {
  _id: string;
  userId: string;
  username: string;
  profileImage: string;
}
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
  isPrivate?: boolean;
  userTitle?: string;
  followRequests?: FollowRequests[];
  bio?: string;
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
    case USER_DELETE_POST: {
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
    case USER_LEAVE_COMMENT: {
      const { _id } = action.payload;
      return {
        ...state,
        userPosts: state.userPosts?.map((post) =>
          post._id === _id ? action.payload : post
        ),
      };
    }
    case USER_LIKE_POST: {
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
    case ACCEPT_FOLLOW_REQUEST: {
      return {
        ...state,
        followRequests: state.followRequests.filter(
          (request) => request.userId !== action.payload
        ),
        followers: [...state.followers, action.payload],
      };
    }
    case DELETE_FOLLOW_REQUEST: {
      return {
        ...state,
        followRequests: state.followRequests.filter(
          (request) => request.userId !== action.payload
        ),
      };
    }
    case SWITCH_ACCOUNT_STATE: {
      return {
        ...state,
        isPrivate: !state.isPrivate,
      };
    }
    case DELETE_ALL_FOLLOW_REQUESTS: {
      return {
        ...state,
        followRequests: [],
      };
    }
    case USER_DELETE_COMMENT: {
      const { postId, commentId } = action.payload;
      return {
        ...state,
        userPosts: state.userPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments: post.comments.filter(
                  (comment) => comment._id !== commentId
                ),
              }
            : post
        ),
      };
    }
    case EDIT_USER_POST: {
      const { postId, message, title } = action.payload;
      return {
        ...state,
        userPosts: state.userPosts.map((post) =>
          post._id === postId ? { ...post, title, message, isEdit: true } : post
        ),
      };
    }
    case UPDATE_USER_BIO: {
      return {
        ...state,
        bio: action.payload,
      };
    }
    default:
      return state;
  }
};
export default AuthReducer;
