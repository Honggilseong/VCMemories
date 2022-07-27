import { Image } from "cloudinary-react";
import { useSelector } from "react-redux";
import { GetSearchingUser } from "../../reducers/searchUserReducers";
import { RootState } from "../../reducers/store";
import Post from "./Post";
const defaultProfilePicture =
  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
interface Props {
  handleFollowUser: (searchUserId: string, userId: string) => void;
  searchUserInfo: GetSearchingUser;
  isFollowing: boolean;
}

function Body({ handleFollowUser, searchUserInfo, isFollowing }: Props) {
  const authUser = useSelector((state: RootState) => state.auth);
  return (
    <section className="w-full h-full">
      <div className="max-w-xl mx-auto">
        <div className="w-full border-b-purple-500 border-b flex items-center flex-col">
          <div className="w-36 h-36 rounded-full overflow-hidden border-8 border-green-500 mt-5 cursor-pointer mb-5">
            {searchUserInfo.profilePicture === defaultProfilePicture ? (
              <img
                src={searchUserInfo.profilePicture}
                alt="userProfilePicture"
              />
            ) : (
              <Image
                cloudName={process.env.REACT_APP_CLOUDINARY_USERNAME}
                publicId={searchUserInfo.profilePicture}
                className="w-full h-full"
                crop="scale"
              />
            )}
          </div>
        </div>
        <div className="flex justify-evenly mt-5 mb-5">
          <div className="flex justify-center items-center flex-col cursor-pointer">
            <h2 className="font-bold text-xl">Followers</h2>
            <p>{searchUserInfo.followers?.length}</p>
          </div>
          <div className="flex justify-center items-center flex-col cursor-pointer">
            <h2 className="font-bold text-xl">Following</h2>
            <p>{searchUserInfo.following?.length}</p>
          </div>
        </div>
        <div className="flex text-white">
          <div
            className="flex-[0.5] p-3 flex items-center justify-center cursor-pointer bg-purple-500 rounded-lg mb-3"
            onClick={() => handleFollowUser(searchUserInfo._id, authUser._id)}
          >
            <p>{isFollowing ? "Unfollow" : "Follow"}</p>
          </div>
          <div className="flex-[0.5] p-3 flex items-center justify-center cursor-pointer bg-blue-700 rounded-lg mb-3">
            <p>Message</p>
          </div>
        </div>
        {searchUserInfo.userPosts?.length ? (
          <div className="min-h-[500px] grid grid-cols-3 border gap-1">
            {searchUserInfo.userPosts?.map((post) => (
              <div key={post._id}>
                <Post post={post} authUser={authUser} />
              </div>
            ))}
          </div>
        ) : (
          <div className="h-[500px] justify-center items-center flex border">
            <p>The user never posted</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Body;
