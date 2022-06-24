import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NewPost } from "../../actions/postActionDispatch";
import { RootState } from "../../reducers";

interface Props {
  handleFollowUser: (searchUserId: string, userId: string) => void;
}

function Body({ handleFollowUser }: Props) {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const userInfo = useSelector((state: RootState) => state.searchUser);
  const getUser = JSON.parse(localStorage.getItem("profile") || "");

  useEffect(() => {
    const index = userInfo.followers.findIndex((id) => id === getUser.user._id);

    if (index === -1) {
      setIsFollowing(false);
    } else {
      setIsFollowing(true);
    }
  }, [userInfo.followers]);

  return (
    <section className="w-full h-full">
      <div className="max-w-xl mx-auto">
        <div className="w-full border-b-purple-500 border-b flex items-center flex-col">
          <div className="w-36 h-36 rounded-full overflow-hidden border-8 border-green-500 mt-5 cursor-pointer">
            <img src={userInfo.profilePicture} alt="userProfilePicture" />
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
        <div className="flex text-white">
          <div
            className="flex-[0.5] p-3 flex items-center justify-center cursor-pointer bg-purple-500 rounded-lg mb-3"
            onClick={() => handleFollowUser(userInfo._id, getUser.user._id)}
          >
            <p>{isFollowing ? "Unfollow" : "Follow"}</p>
          </div>
          <div className="flex-[0.5] p-3 flex items-center justify-center cursor-pointer bg-blue-700 rounded-lg mb-3">
            <p>Message</p>
          </div>
        </div>
        {userInfo.userPosts?.length ? (
          <div className="min-h-[500px] grid grid-cols-3 border gap-1">
            {userInfo.userPosts?.map((post: NewPost) => (
              <div
                key={post._id}
                className="cursor-pointer flex justify-center items-center flex-col"
              >
                <h1>{post.message}</h1>
                <h2>{post.title}</h2>
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
