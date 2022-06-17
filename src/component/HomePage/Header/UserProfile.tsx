import React from "react";
import { useInternalRouter } from "../../../pages/routing";
interface User {
  name: string;
  token: string;
  email: string;
  profilePicture: string;
}
interface Props {
  user: User | null;
}
function UserProfile({ user }: Props) {
  const navigate = useInternalRouter();
  const handleUserProfile = () => {
    navigate.push("/profile");
  };
  return (
    <div>
      {user ? (
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={handleUserProfile}
        >
          <h1 className="mr-4">{user.name}</h1>
          <div className="rounded-full border-2 w-10 h-10 hidden lg:block">
            <img
              src={user.profilePicture}
              alt="userProfilePicture"
              className="rounded-full"
            />
          </div>
        </div>
      ) : (
        <div className="bg-purple-800 border-2 border-purple-900 p-2 rounded-lg cursor-pointer hover:bg-purple-700">
          Sign In
        </div>
      )}
    </div>
  );
}

export default UserProfile;
