import { Dispatch } from "redux";
import {
  ACCEPT_FOLLOW_REQUEST,
  CREATE_USER,
  DELETE_ALL_FOLLOW_REQUESTS,
  DELETE_FOLLOW_REQUEST,
  DELETE_NOTIFICATIONS,
  USER_DELETE_POST,
  DELETE_USER,
  GET_USER_INFO,
  READ_NOTIFICATIONS,
  SIGN_IN,
  SIGN_OUT,
  SWITCH_ACCOUNT_STATE,
  UPLOAD_PROFILE_IMAGE,
  UserInfo,
  USER_LEAVE_COMMENT,
  USER_LIKE_POST,
  USER_DELETE_COMMENT,
  EDIT_USER_POST,
  UPDATE_USER_BIO,
} from "./authActionDispatch";
import * as api from "../api";
import { Comment } from "./postActionDispatch";
import { toastError, toastSuccess } from "../util/toast";

export const createUser =
  (userInfo: UserInfo, navigate: any, location?: any) =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await api.signUp(userInfo);
      dispatch({
        type: CREATE_USER,
        payload: data,
      });
      const userData = await api.getUserInfo(data.user._id);
      dispatch({
        type: GET_USER_INFO,
        payload: userData.data,
      });
      if (location && location?.state?.from?.match("forum")) {
        navigate("/forum/vrchat");
        return;
      }
      navigate("/");
    } catch (error: any) {
      console.log(error);
      toastError(error.response.data.message);
    }
  };
export const signIn =
  (userInfo: UserInfo, navigate: any, location?: any) =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await api.signIn(userInfo);
      dispatch({
        type: SIGN_IN,
        payload: data,
      });
      const userData = await api.getUserInfo(data.user._id);
      dispatch({
        type: GET_USER_INFO,
        payload: userData.data,
      });
      if (location && location?.state?.from?.match("forum")) {
        navigate("/forum/vrchat");
        return;
      }
      navigate("/");
    } catch (error) {
      console.log(error);
      toastError("Your email or password is wrong... please try again...");
    }
  };
export const signOut = () => (dispatch: Dispatch) => {
  dispatch({
    type: SIGN_OUT,
  });
};

export const getUserInfo = (id: string) => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.getUserInfo(id);
    dispatch({
      type: GET_USER_INFO,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    toastError("Sorry something went wrong... please try again... 😢");
  }
};

export const deletePost =
  (id: string, userId: string) => async (dispatch: Dispatch) => {
    try {
      await api.deletePost(id, userId);
      dispatch({
        type: USER_DELETE_POST,
        payload: id,
      });
      toastSuccess("Success! 😀");
    } catch (err) {
      console.log(err);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };

export const uploadProfileImage =
  (id: string, uploadImage: string) => async (dispatch: Dispatch) => {
    try {
      await api.uploadProfileImage(id, uploadImage);
      dispatch({
        type: UPLOAD_PROFILE_IMAGE,
        payload: uploadImage,
      });
      toastSuccess("Your image has been uploaded successfully 😀");
    } catch (error) {
      console.log(error);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };

export const readNotifications = (id: string) => async (dispatch: Dispatch) => {
  try {
    await api.readNotification(id);
    dispatch({
      type: READ_NOTIFICATIONS,
    });
  } catch (error) {
    console.log(error);
    toastError("Sorry something went wrong... please try again... 😢");
  }
};

export const deleteNotifications =
  (id: string) => async (dispatch: Dispatch) => {
    try {
      await api.deleteNotifications(id);
      dispatch({
        type: DELETE_NOTIFICATIONS,
      });
    } catch (error) {
      console.log(error);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };

export const leaveComment =
  (
    id: string,
    comment: Comment,
    postUserId: string,
    senderName: string,
    image: string
  ) =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await api.leaveComment(id, comment);
      dispatch({
        type: USER_LEAVE_COMMENT,
        payload: data,
      });
      if (comment.commentUserId !== postUserId) {
        api.sendNotification(postUserId, {
          sender: senderName,
          notificationType: "Left a comment",
          image,
          postId: id,
        });
      }
      toastSuccess("Your comment has been left successfully 😀");
    } catch (err) {
      console.log(err);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };

export const likePost =
  (
    id: string,
    userId: string,
    postUserId: string,
    senderName: string,
    image: string
  ) =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await api.likePost(id, userId);
      if (userId !== postUserId) {
        api.sendNotification(postUserId, {
          sender: senderName,
          notificationType: "liked your Post",
          image,
          postId: id,
        });
      }
      dispatch({
        type: USER_LIKE_POST,
        payload: data,
      });
    } catch (err) {
      console.log(err);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };
export const deleteUser =
  (id: string, localId: string) => async (dispatch: Dispatch) => {
    if (id !== localId)
      return toastError(
        "Sorry something went wrong... please sign-in again... 😢"
      );
    try {
      await api.deleteUser(id);
      dispatch({
        type: DELETE_USER,
      });
      toastSuccess("Your account has been deleted successfully");
    } catch (err) {
      console.log(err);
      toastError(
        "Sorry we couldn't delete your account... please try again... 😢"
      );
    }
  };
export const sendFollowRequest = async (id: string, senderData: any) => {
  try {
    await api.sendFollowRequest(id, senderData);

    toastSuccess("Your request has been delivered successfully");
  } catch (err: any) {
    console.log(err);
    toastError(
      err.response.data.message
        ? err.response.data.message
        : "we couldn't delivered your request... please try again... 😢"
    );
  }
};
export const acceptFollowRequest =
  (id: string, userId: string) => async (dispatch: Dispatch) => {
    try {
      await api.acceptFollowRequest(id, userId);
      dispatch({
        type: ACCEPT_FOLLOW_REQUEST,
        payload: userId,
      });
      toastSuccess("Accepted!");
    } catch (err) {
      console.log(err);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };
export const deleteFollowRequest =
  (id: string, userId: string) => async (dispatch: Dispatch) => {
    try {
      await api.deleteFollowRequest(id, userId);
      dispatch({
        type: DELETE_FOLLOW_REQUEST,
        payload: userId,
      });
      toastSuccess("Deleted!");
    } catch (err) {
      console.log(err);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };
export const switchAccountState =
  (id: string) => async (dispatch: Dispatch) => {
    try {
      await api.switchAccountState(id);
      dispatch({
        type: SWITCH_ACCOUNT_STATE,
      });
      toastSuccess("Switched your status!");
    } catch (err) {
      console.log(err);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };
export const deleteAllFollowRequests =
  (id: string) => async (dispatch: Dispatch) => {
    try {
      await api.deleteAllFollowRequests(id);
      dispatch({
        type: DELETE_ALL_FOLLOW_REQUESTS,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const deleteUserComment =
  (postId: string, commentId: string) => async (dispatch: Dispatch) => {
    const IDs = {
      postId,
      commentId,
    };
    try {
      await api.deleteUserComment(postId, commentId);
      dispatch({ type: USER_DELETE_COMMENT, payload: IDs });
      toastSuccess("Deleted your comment!");
    } catch (err) {
      console.log(err);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };
export const editUserPost =
  (postId: string, message: string, title: string) =>
  async (dispatch: Dispatch) => {
    const editPost = {
      postId,
      message,
      title,
    };
    try {
      await api.editUserPost(postId, message, title);
      dispatch({ type: EDIT_USER_POST, payload: editPost });
      toastSuccess("Your post has been updated!");
    } catch (err) {
      console.log(err);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };
export const updateUserBio =
  (id: string, bio: string) => async (dispatch: Dispatch) => {
    try {
      await api.updateUserBio(id, bio);
      dispatch({ type: UPDATE_USER_BIO, payload: bio });
      toastSuccess("Your bio has been updated!");
    } catch (err) {
      console.log(err);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };
export const mentionUser =
  (
    id: string,
    sender: string,
    image: string,
    notificationType: string,
    mentionUsers: string[]
  ) =>
  async (dispatch: Dispatch) => {
    try {
      await api.mentionUser(id, sender, image, notificationType, mentionUsers);
    } catch (err) {
      console.log(err);
      toastError("Sorry something went wrong... please try again... 😢");
    }
  };
