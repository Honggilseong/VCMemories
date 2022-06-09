import React, { useState } from "react";
import { createUser, signIn } from "../actions/authAction";
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

  return (
    <div className="w-screen h-screen flex">
      <div className="flex flex-row justify-center border-r-2 w-[550px]">
        <div>
          <h1 className="font-bold text-3xl mt-36 text-center">
            {isSignUp ? "Sign Up" : "Sign In"}
          </h1>
          <div className="border w-[300px] mt-5 mb-5 border-purple-500" />
          <form onSubmit={handleSubmit}>
            <span className="text-gray-500">Email</span>
            <div className="h-11 mt-2 mb-5">
              <input
                name="email"
                type="email"
                className="w-full h-full border rounded-lg border-purple-500 focus: outline-purple-700 focus: outline-4 p-1"
                placeholder="Enter your email"
                onChange={handleInputUserInfo}
                value={userInfo.email}
              />
            </div>
            {isSignUp && (
              <>
                <span className="text-gray-500">Name</span>
                <div className="h-11 mt-2 mb-5">
                  <input
                    name="name"
                    type="text"
                    className="w-full h-full border rounded-lg border-purple-500 focus: outline-purple-700 focus: outline-4 p-1"
                    placeholder="Enter your name"
                    onChange={handleInputUserInfo}
                    value={userInfo.name}
                  />
                </div>
              </>
            )}
            <span className="text-gray-500">Password</span>
            <div className="h-11 mt-2 flex justify-center items-center border border-purple-500 focus-within:border-2 rounded-lg p-1">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="w-full h-full outline-none p-1 rounded-lg"
                placeholder="Enter your password"
                onChange={handleInputUserInfo}
                value={userInfo.password}
              />
              <p onClick={handleShowPassword} className="cursor-pointer">
                {showPassword ? "Hide" : "Show"}
              </p>
            </div>
            <button
              className="cursor-pointer bg-purple-500 flex items-center justify-center text-white h-11 mt-5 rounded-lg w-full"
              type="submit"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>
          <p className="text-center mt-4 text-gray-500">
            {isSignUp ? "You have an account? " : "You don't have an account? "}
            <span
              className="text-blue-500 font-bold cursor-pointer"
              onClick={handleSignUp}
            >
              Click here
            </span>
          </p>
        </div>
      </div>
      <div className="flex-1">Background</div>
    </div>
  );
}

export default AuthPage;
