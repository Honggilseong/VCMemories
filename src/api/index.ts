import axios, { AxiosPromise } from "axios";

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface PostData {
  name: string;
  picture: string;
  title: string;
  profilePicture: string;
  tags: string[];
  message: string;
}

const API = axios.create({ baseURL: "http://localhost:5000/" });
const user = JSON.parse(localStorage.getItem("profile") || "");
const config = {
  headers: {
    "Content-type": "application/json",
    Authorization: "Bearer " + user.user.token,
  },
};
export const signUp = (formData: FormData): AxiosPromise => {
  return API.post("/user/signup", formData);
};

export const signIn = (formData: FormData): AxiosPromise => {
  return API.post("/user/signin", formData);
};

export const createPost = (postData: PostData): AxiosPromise => {
  return API.post("/posts/createpost", postData, config);
};
