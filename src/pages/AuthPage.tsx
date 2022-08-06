import React, { useEffect, useState } from "react";
import { createUser, signIn } from "../actions/authAction";
import AuthPageForm from "../component/AuthPage/AuthPageForm";
import { useAppDispatch } from "../reducers/store";
import { toastError } from "../util/toast";
import { useInternalRouter } from "./routing";
const authPageImg = require("../images/authpageimg.png");

interface UserInfo {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

function AuthPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    password: "",
    email: "",
    name: "",
    confirmPassword: "",
  });
  const dispatch = useAppDispatch();

  const { push } = useInternalRouter();

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    if (isSignUp) {
      if (!userInfo.email) return toastError("Enter your email");
      if (!userInfo.name) return toastError("Enter your username");
      if (userInfo.password !== userInfo.confirmPassword) {
        return toastError("Please check your password");
      }
      if (userInfo.name.length > 20)
        return toastError(
          "Your username is too long. Use a username that's less than 20 characters"
        );
      if (userInfo.name.match(/^[0-9A-Za-z]+$/) === null) {
        return toastError("We only allow alphabets and numbers for username");
      }
      dispatch(createUser(userInfo, push));
    } else {
      dispatch(signIn(userInfo, push));
    }
  };

  const handleInputUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSignUp = () => {
    setIsSignUp((prevState) => !prevState);
    setUserInfo({
      password: "",
      email: "",
      name: "",
      confirmPassword: "",
    });
  };
  const handleClickTermsOrPrivacy = (name: string) => {
    push(name);
  };
  // useEffect(() => {
  //   const isAuthenticated = localStorage.getItem("profile") ?? "";
  //   if (isAuthenticated) push("/");
  // }, []);
  const props = {
    handleSignUp,
    handleShowPassword,
    handleInputUserInfo,
    handleSubmit,
    handleClickTermsOrPrivacy,
    userInfo,
    showPassword,
    isSignUp,
  };

  return (
    <div className="w-screen h-screen flex flex-1">
      <div className="flex-[0.3] border-r-2 border-gray-800">
        <AuthPageForm {...props} />
      </div>
      <div className="flex-[0.7] h-screen w-full">
        <img src={authPageImg} alt="authpageimg" className="w-full h-full" />
      </div>
    </div>
  );
}

export default AuthPage;
