import React from "react";
import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";

interface Props {
  authUser: any;
  settingState: string;
  handleClickSignOut: () => void;
  handleDeleteUser: () => void;
  handleClickSettings: (option: string) => void;
  handleClickAccountState: () => void;
}
function Body({
  authUser,
  handleClickSignOut,
  handleClickSettings,
  settingState,
  handleDeleteUser,
  handleClickAccountState,
}: Props) {
  return (
    <div className="max-w-3xl m-auto mt-5">
      <div className="flex">
        <div className="flex-[0.3] border border-gray-400">
          <div
            className="cursor-pointer text-xl border-b p-3"
            onClick={() => handleClickSettings("accountSettings")}
          >
            <p>Account settings</p>
          </div>
          <div
            className="cursor-pointer text-xl border-b p-3"
            onClick={() => handleClickSettings("contactUs")}
          >
            <p>Contact us</p>
          </div>
          <div
            className="cursor-pointer text-xl border-b p-3"
            onClick={handleClickSignOut}
          >
            <p>Sign out</p>
          </div>
          <div
            className="cursor-pointer text-xl border-b p-3 bg-red-600 text-white"
            onClick={() => handleClickSettings("deleteAccount")}
          >
            <p>Delete my account</p>
          </div>
        </div>
        {settingState === "accountSettings" && (
          <div className="flex-[0.7] border-r border-b border-t p-2 border-gray-400">
            <div className="w-full flex justify-center p-2 items-center">
              <div className="w-full flex items-center justify-between">
                <p>Private Account</p>
                <div className="flex flex-col items-center">
                  <p className="text-sm">Current status</p>
                  <p className="font-bold">
                    {authUser.isPrivate ? (
                      <div
                        className="flex justify-center items-center cursor-pointer"
                        onClick={handleClickAccountState}
                      >
                        <AiOutlineLock size={20} className="mr-2" />
                        <p>Private</p>
                      </div>
                    ) : (
                      <div
                        className="flex justify-center items-center cursor-pointer"
                        onClick={handleClickAccountState}
                      >
                        <AiOutlineUnlock size={20} className="mr-2" />
                        <p>Public</p>
                      </div>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {settingState === "contactUs" && (
          <div className="flex-[0.7] border-r border-b border-t p-2 border-gray-400 flex items-center justify-center">
            <p className="text-center">
              Experiencing problems? Contact us at{" "}
              <span className="font-bold">vcmemoriessp@gmail.com</span> and
              we'll be sure to help!
            </p>
          </div>
        )}
        {settingState === "deleteAccount" && (
          <div className="flex-[0.7] border-r border-b border-t p-2 border-gray-400 flex items-center justify-center flex-col">
            <p className="text-center font-bold text-lg">
              Are you sure you want to delete your account?
            </p>
            <p>Once deleted accounts cannot be recovered</p>
            <div
              className="bg-red-600 p-3 rounded-lg text-white mt-3 cursor-pointer"
              onClick={handleDeleteUser}
            >
              <p>DELETE</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Body;
