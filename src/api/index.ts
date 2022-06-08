import axios from "axios";

interface FormData {
  name: String;
  email: String;
  password: String;
}

const API = axios.create({ baseURL: "http://localhost:5000/" });

export const signUp = (formData: FormData) => {
  API.post("/user/signup", formData);
};
