import axios, { AxiosPromise } from "axios";

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
}
interface NotificationSender {
  sender: string;
  notificationType: string;
  image?: string;
}
const API = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });
//user
export const signUp = (formData: FormData): AxiosPromise => {
  return API.post("/user/signup", formData);
};

export const signIn = (formData: FormData): AxiosPromise => {
  return API.post("/user/signin", formData);
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

//posts
export const createPost = (postData: PostData): AxiosPromise => {
  const user = JSON.parse(localStorage.getItem("profile") || "");

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
  };
  return API.post("/posts/createpost", postData, config);
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
