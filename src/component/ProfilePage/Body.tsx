import { Image } from "cloudinary-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NewPost } from "../../actions/postActionDispatch";
import { useInternalRouter } from "../../pages/routing";
import { RootState } from "../../reducers";
import { useAppDispatch } from "../../reducers/store";
import Post from "./Post";
import ProfileImageModal from "./ProfileImageModal";
const defaultProfilePicture =
  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
function Body() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const authUser = useSelector((state: RootState) => state.auth);
  const { push } = useInternalRouter();

  const handleClickSettings = () => {
    push("/usersettings");
  };
  const handleOpenUploadProfile = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <section className="w-full h-full">
        <div className="max-w-xl mx-auto">
          <div className="flex flex-row-reverse text-white">
            <div
              className="p-2 bg-gray-400 rounded-lg cursor-pointer mt-2"
              onClick={handleClickSettings}
            >
              <p>Settings</p>
            </div>
          </div>
          <div className="w-full border-b-purple-500 border-b flex items-center flex-col">
            <div
              className="w-36 h-36 rounded-full overflow-hidden border-8 border-green-500 mt-5 cursor-pointer"
              onClick={handleOpenUploadProfile}
            >
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
            <h1 className="font-bold text-3xl mt-5 mb-5">{authUser.name}</h1>
          </div>
          <div className="flex justify-evenly mt-5 mb-5">
            <div className="flex justify-center items-center flex-col cursor-pointer">
              <h2 className="font-bold text-xl">Followers</h2>
              <p>{authUser.followers?.length}</p>
            </div>
            <div className="flex justify-center items-center flex-col cursor-pointer">
              <h2 className="font-bold text-xl">Following</h2>
              <p>{authUser.following?.length}</p>
            </div>
          </div>
          {authUser.userPosts?.length ? (
            <div className="min-h-[500px] grid grid-cols-3 gap-4">
              {authUser.userPosts?.map((post: NewPost) => (
                <div key={post._id}>
                  <Post post={post} authUser={authUser} />
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[500px] justify-center items-center flex border">
              <p>No Posts</p>
            </div>
          )}
        </div>
      </section>
      <ProfileImageModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        authUser={authUser}
      />
    </>
  );
}

export default Body;
