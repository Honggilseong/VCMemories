import React, { useState } from "react";
import { createUser, signIn } from "../actions/authAction";
import AuthPageForm from "../component/AuthPage/AuthPageForm";
import { useAppDispatch } from "../reducers/store";
import { useInternalRouter } from "./routing";

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
    <div className="w-screen h-screen flex">
      <AuthPageForm {...props} />
      <div className="flex-1">Background</div>
    </div>
  );
}

export default AuthPage;
