import { Image } from "cloudinary-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { signOut } from "../../actions/authAction";
import { resetPosts } from "../../actions/postAction";
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
  const userInfo = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useInternalRouter();
  const handleClickSignOut = () => {
    dispatch(signOut());
    dispatch(resetPosts());
    navigate.push("/auth");
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
              className="p-1 bg-red-500 rounded-lg cursor-pointer mt-2"
              onClick={handleClickSignOut}
            >
              <p className="">Sign Out</p>
            </div>
          </div>
          <div className="w-full border-b-purple-500 border-b flex items-center flex-col">
            <div
              className="w-36 h-36 rounded-full overflow-hidden border-8 border-green-500 mt-5 cursor-pointer"
              onClick={handleOpenUploadProfile}
            >
              {userInfo.profilePicture === defaultProfilePicture ? (
                <img src={userInfo.profilePicture} alt="userProfilePicture" />
              ) : (
                <Image
                  cloudName={process.env.REACT_APP_CLOUDINARY_USERNAME}
                  publicId={userInfo.profilePicture}
                  className="w-full h-full"
                  crop="scale"
                />
              )}
            </div>
            <h1 className="font-bold text-3xl mt-5 mb-5">{userInfo.name}</h1>
          </div>
          <div className="flex justify-evenly mt-5 mb-5">
            <div className="flex justify-center items-center flex-col cursor-pointer">
              <h2 className="font-bold text-xl">Followers</h2>
              <p>{userInfo.followers?.length}</p>
            </div>
            <div className="flex justify-center items-center flex-col cursor-pointer">
              <h2 className="font-bold text-xl">Following</h2>
              <p>{userInfo.following?.length}</p>
            </div>
          </div>
          {userInfo.userPosts?.length ? (
            <div className="min-h-[500px] grid grid-cols-3 border gap-1">
              {userInfo.userPosts?.map((post: NewPost) => (
                <div key={post._id}>
                  <Post post={post} userInfo={userInfo} />
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[500px] justify-center items-center flex border">
              <p>You never posted</p>
            </div>
          )}
        </div>
      </section>
      <ProfileImageModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        userInfo={userInfo}
      />
    </>
  );
}

export default Body;
