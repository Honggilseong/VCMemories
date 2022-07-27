import React, { useEffect, useState } from "react";
import { createUser, signIn } from "../actions/authAction";
import AuthPageForm from "../component/AuthPage/AuthPageForm";
import { useAppDispatch } from "../reducers/store";
import { useInternalRouter } from "./routing";
const authPageImg = require("../images/authpageimg.png");

interface UserInfo {
  email: string;
  password: string;
  name: string;
}

function AuthPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    password: "",
    email: "",
    name: "",
  });
  const dispatch = useAppDispatch();
  const isAuthenticated = localStorage.getItem("profile") ?? "";
  const { push } = useInternalRouter();

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    if (isSignUp) {
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
    });
  };

  useEffect(() => {
    if (isAuthenticated) push("/");
  }, []);
  const props = {
    handleSignUp,
    handleShowPassword,
    handleInputUserInfo,
    handleSubmit,
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
