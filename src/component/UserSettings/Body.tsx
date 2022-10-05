import React from "react";
import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";

interface Props {
  authUser: any;
  settingState: string;
  isOpenBio: boolean;
  bioValue: string;
  handleClickSignOut: () => void;
  handleDeleteUser: () => void;
  handleClickSettings: (option: string) => void;
  handleClickAccountState: () => void;
  handleClickBio: () => void;
  handleChangeBioValue: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleClickUpdateBio: () => void;
}
function Body({
  authUser,
  settingState,
  isOpenBio,
  bioValue,
  handleClickSignOut,
  handleClickSettings,
  handleDeleteUser,
  handleClickAccountState,
  handleClickBio,
  handleChangeBioValue,
  handleClickUpdateBio,
}: Props) {
  return (
    <div className="xl:w-[768px] w-[500px] mx-auto mt-5">
      <div className="flex">
        <div className="xl:w-[268px] w-[200px] border border-gray-400">
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
          <div className="xl:w-[500px] w-[300px] border-r border-b border-t p-2 border-gray-400">
            <div className="w-full flex justify-center p-2 items-center">
              <div className="w-full flex items-center justify-between">
                <p>Private Account</p>
                <div className="flex flex-col items-center">
                  <p className="text-sm">Current status</p>

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
                </div>
              </div>
            </div>
            <div className="flex p-2 justify-between w-full">
              <p className="mr-2">Bio</p>
              <div className="w-[90%]">
                {isOpenBio ? (
                  <>
                    <textarea
                      maxLength={100}
                      id="bio"
                      rows={3}
                      onChange={(event) => handleChangeBioValue(event)}
                      value={bioValue}
                      className="border-2 border-black w-full"
                    />
                    <div className="flex flex-row-reverse">
                      <button
                        onClick={handleClickBio}
                        className="bg-slate-400 p-1 text-white rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleClickUpdateBio}
                        className="bg-green-500 p-1 mr-1 text-white rounded-lg"
                      >
                        Update
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="border w-full" onClick={handleClickBio}>
                    <div className="cursor-pointer p-1 h-6 flex items-center">
                      <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                        {authUser.bio}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {settingState === "contactUs" && (
          <div className="xl:w-[500px] w-[300px] border-r border-b border-t p-2 border-gray-400 flex items-center justify-center">
            <p className="text-center">
              Experiencing problems? Contact us at{" "}
              <span className="font-bold">vcmemoriessp@gmail.com</span> and
              we'll be sure to help!
            </p>
          </div>
        )}
        {settingState === "deleteAccount" && (
          <div className="xl:w-[500px] w-[300px] border-r border-b border-t p-2 border-gray-400 flex items-center justify-center flex-col">
            <p className="text-center font-bold text-lg">
              Are you sure you want to delete your account?
            </p>
            <p className="text-center">
              Once deleted accounts cannot be recovered
            </p>
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
