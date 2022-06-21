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

const API = axios.create({ baseURL: "http://localhost:5000/" });
const user = JSON.parse(localStorage.getItem("profile") || "");
const config = {
  headers: {
    "Content-type": "application/json",
    Authorization: "Bearer " + user.user.token,
  },
};
//user
export const signUp = (formData: FormData): AxiosPromise => {
  return API.post("/user/signup", formData);
};

export const signIn = (formData: FormData): AxiosPromise => {
  return API.post("/user/signin", formData);
};

export const getUserInfo = (id: string): AxiosPromise => {
  return API.get(`/user/getuserinfo/${id}`, config);
};

export const getSearchingUser = (
  username: string | undefined
): AxiosPromise => {
  return API.get(`/user/${username}`, config);
};
//posts
export const createPost = (postData: PostData): AxiosPromise => {
  return API.post("/posts/createpost", postData, config);
};
export const getPosts = (): AxiosPromise => {
  return API.get("/posts/", config);
};

export const deletePost = (id: string, userId: string): AxiosPromise => {
  return API.delete(`/posts/${id}`, {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + user.user.token,
    },
    data: { userId },
  });
};

export const likePost = (id: string, userId: string): AxiosPromise => {
  return API.patch(`/posts/${id}/likepost`, { userId }, config);
};
