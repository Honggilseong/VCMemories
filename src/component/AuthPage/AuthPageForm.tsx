import React from "react";
import Input from "./Input";

interface UserInfo {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

interface Props {
  handleSignUp: () => void;
  handleShowPassword: () => void;
  handleInputUserInfo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<EventTarget>) => void;
  userInfo: UserInfo;
  showPassword: boolean;
  isSignUp: boolean;
}

function AuthPageForm({
  handleSignUp,
  handleShowPassword,
  handleInputUserInfo,
  handleSubmit,
  userInfo,
  showPassword,
  isSignUp,
}: Props) {
  return (
    <div className="flex flex-row justify-center w-[550px]">
      <div>
        <h1 className="font-bold text-3xl mt-36 text-center">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h1>
        <div className="border w-[300px] mt-5 mb-5 border-purple-500" />
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleInputUserInfo}
            value={userInfo.email}
          />
          {isSignUp && (
            <Input
              label="Name"
              name="name"
              type="text"
              placeholder="Enter your name"
              onChange={handleInputUserInfo}
              value={userInfo.name}
            />
          )}
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={handleInputUserInfo}
            value={userInfo.password}
            showPassword={showPassword}
            isPassword
            handleShowPassword={handleShowPassword}
          />
          {isSignUp && (
            <Input
              label="Confirm password"
              name="confirmPassword"
              type="password"
              placeholder="Enter your password"
              onChange={handleInputUserInfo}
              value={userInfo.confirmPassword}
              showPassword={showPassword}
              isPassword
              handleShowPassword={handleShowPassword}
            />
          )}
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
  );
}

export default AuthPageForm;
