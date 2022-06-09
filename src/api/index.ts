import axios, { AxiosPromise } from "axios";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const API = axios.create({ baseURL: "http://localhost:5000/" });

export const signUp = (formData: FormData): AxiosPromise => {
  return API.post("/user/signup", formData);
};

export const signIn = (formData: FormData): AxiosPromise => {
  return API.post("/user/signin", formData);
};
