import axios, { AxiosPromise } from "axios";
import {
  Comment as BoardPostComment,
  Reply,
} from "../actions/boardPostDispatch";
interface FormData {
  name: string;
  email: string;
  password: string;
}

interface PostData {
  title: string;
  picture: string;
  message: string;
  tags: string[];
  name: string;
  profilePicture: string;
  userId: string;
  likes: string[];
  images?: any;
  postType: string;
}
interface NotificationSender {
  sender: string;
  notificationType: string;
  image?: string;
  postId?: string;
}
const API = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });
//user
export const signUp = (formData: FormData): AxiosPromise => {
  return API.post("/user/signup", formData);
};

export const signIn = (formData: FormData): AxiosPromise => {
  return API.post("/user/signin", formData);
};

export const getFollowUsersList = (id: string, followList: string[]) => {
  const user = JSON.parse(localStorage.getItem("profile") || "");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.post(`/user/${id}/getfollowusers`, { followList }, config);
};

export const sendNotification = (
  id: string,
  sender: NotificationSender
): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.patch(`/user/${id}/notification`, sender, config);
};

export const readNotification = (id: string): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.patch(`/user/${id}/readnotification`, {}, config);
};

export const deleteNotifications = (id: string): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.patch(`/user/${id}/deletenotifications`, {}, config);
};

export const uploadProfileImage = (
  id: string,
  uploadImage: string
): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.patch("/user/uploadprofileimage", { id, uploadImage }, config);
};

export const followUser = (id: string, userId: string): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.patch(`/user/followuser/${id}`, { userId }, config);
};

export const getUserInfo = (id: string): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.get(`/user/getuserinfo/${id}`, config);
};

export const getSearchingUser = (
  username: string | undefined
): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.get(`/user/search/${username}`, config);
};

export const getAllUsers = (): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.get("/user/getallusers", config);
};
export const deleteUser = (id: string): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.delete(`/user/deleteaccount/${id}`, config);
};
export const sendFollowRequest = (
  id: string,
  senderData: any
): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.patch(`/user/${id}/followrequest`, { senderData }, config);
};
export const acceptFollowRequest = (
  id: string,
  userId: string
): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.patch(`/user/${id}/acceptfollowrequest`, { userId }, config);
};
export const deleteFollowRequest = (
  id: string,
  userId: string
): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.patch(`/user/${id}/deletefollowrequest`, { userId }, config);
};
export const switchAccountState = (id: string): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.patch(`/user/${id}/switchaccountstate`, {}, config);
};
export const deleteAllFollowRequests = (id: string): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.patch(`/user/${id}/deleteallfollowrequests`, {}, config);
};
export const updateUserBio = (id: string, bio: string): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.patch(`/user/${id}/updatebio`, { bio }, config);
};

//posts
export const mentionUser = (
  id: string,
  sender: string,
  image: string,
  notificationType: string,
  mentionUsers: string[]
): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.patch(
    `/posts/${id}/mentionuser`,
    { mentionUsers, sender, image, notificationType },
    config
  );
};
export const createPost = (formData: any): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");

  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.patch("/posts/createpost", formData, config);
};

export const getPosts = (followingUsers: string[]): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.post("/posts/", followingUsers, config);
};

export const getHashtagPosts = (hashtag: string): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.get(`/posts/explore/hashtags/${hashtag}`, config);
};

export const deletePost = (id: string, userId: string): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.delete(`/posts/${id}`, {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
    data: { userId },
  });
};

export const likePost = (id: string, userId: string): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.patch(`/posts/${id}/likepost`, { userId }, config);
};

interface Comment {
  commentUserName: string;
  commentUserId: string;
  comment: string;
}

export const leaveComment = (id: string, comment: Comment): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.patch(`/posts/${id}/leavecomment`, { comment }, config);
};

export const editUserPost = (
  postId: string,
  message: string,
  title: string
): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.patch(`/posts/edit/${postId}`, { message, title }, config);
};

export const getNotificationPost = (id: string) => {
  const user = JSON.parse(localStorage.getItem("profile") || "");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.patch(`/posts/${id}/notificationpost`, {}, config);
};

export const deleteUserComment = (
  id: string,
  commentId: string
): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");
  return API.delete(`/posts/${id}/deleteusercomment`, {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
    data: { commentId },
  });
};

//report

export const reportPost = (post: any): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.post("/report/", { post }, config);
};

//board

export const getAllBoardPosts = (): AxiosPromise => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  return API.get("/forum/getallboardposts", config);
};

export const getBoardPostsQuery = (page: number): AxiosPromise => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  return API.get(`/forum/vrchat?page=${!page ? 1 : page}`, config);
};

export const postBoardPost = (boardPost: any): AxiosPromise => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  return API.post("/forum/boardpost/post", { boardPost }, config);
};
export const getBoardPost = (boardPostId: string): AxiosPromise => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  return API.get(`/forum/getboardpost/${boardPostId}`, config);
};

export const updateBoardPost = (
  boardPostId: string,
  boardPost: any
): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.patch(
    `/forum/updateboardpost/${boardPostId}`,
    { boardPost },
    config
  );
};

export const getEditBoardPost = (id: string): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.get(`/forum/geteditboardpost/${id}`, config);
};

export const leaveBoardPostComment = (
  boardPostId: any,
  comment: BoardPostComment
): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.patch(
    `/forum/leaveboardpostcomment/${boardPostId}`,
    { comment },
    config
  );
};
export const leaveBoardPostReply = (
  boardPostId: any,
  comment: Reply,
  commentId: string
): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.patch(
    `/forum/leaveboardpostreply/${boardPostId}`,
    { comment, commentId },
    config
  );
};

export const likeBoardPost = (
  boardPostId: any,
  userId: string
): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.patch(`/forum/likeboardpost/${boardPostId}`, { userId }, config);
};

export const likeBoardPostComment = (
  boardPostId: any,
  userId: string,
  commentId: string
): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.patch(
    `/forum/likeboardpostcomment/${boardPostId}`,
    { userId, commentId },
    config
  );
};

export const likeBoardPostReply = (
  boardPostId: any,
  userId: string,
  commentId: string,
  replyId: string
): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.patch(
    `/forum/likeboardpostreply/${boardPostId}`,
    { userId, commentId, replyId },
    config
  );
};

export const deleteBoardPost = (
  boardPostId: any,
  userId: string
): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.patch(`/forum/deleteboardpost/${boardPostId}`, { userId }, config);
};

export const deleteBoardPostComment = (
  boardPostId: any,
  userId: string,
  commentId: string
): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.patch(
    `/forum/deleteboardpostcomment/${boardPostId}`,
    { userId, commentId },
    config
  );
};

export const deleteBoardPostReply = (
  boardPostId: any,
  userId: string,
  commentId: string,
  replyId: string
): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.patch(
    `/forum/deleteboardpostreply/${boardPostId}`,
    { userId, commentId, replyId },
    config
  );
};

export const editBoardPostComment = (
  boardPostId: any,
  commentId: string,
  editComment: string
): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.patch(
    `/forum/editboardpostcomment/${boardPostId}`,
    { commentId, editComment },
    config
  );
};

export const editBoardPostReply = (
  boardPostId: any,
  commentId: string,
  replyId: string,
  editComment: string
): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.patch(
    `/forum/editboardpostreply/${boardPostId}`,
    { commentId, replyId, editComment },
    config
  );
};

export const uploadBoardPostPreviewImage = (
  id: string,
  image: any
): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.post(
    `/forum/uploadboardpostpreviewimage/${id}`,
    { image },
    config
  );
};

export const getUserBoardPostList = (username: string): AxiosPromise => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  return API.get(`/forum/getuserboardpostlist/${username}`, config);
};
