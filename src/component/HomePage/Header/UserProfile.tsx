import { Image } from "cloudinary-react";
import { useSelector } from "react-redux";
import { useInternalRouter } from "../../../pages/routing";
import { RootState } from "../../../reducers/store";
const defaultProfilePicture =
  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

function UserProfile() {
  const navigate = useInternalRouter();
  const authUser = useSelector((state: RootState) => state.auth);
  const handleUserProfile = () => {
    navigate.push("/profile");
  };
  return (
    <div className="ml-6">
      {authUser ? (
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={handleUserProfile}
        >
          <h1 className="mr-4">{authUser.name}</h1>
          <div className="rounded-full border-2 w-10 h-10 hidden lg:block overflow-hidden">
            {authUser.profilePicture === defaultProfilePicture ? (
              <img src={authUser.profilePicture} alt="userProfilePicture" />
            ) : (
              <Image
                cloudName={process.env.REACT_APP_CLOUDINARY_USERNAME}
                publicId={authUser.profilePicture}
                className="w-full h-full"
                crop="scale"
              />
            )}
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
