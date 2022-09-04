import { useState } from "react";
import { Image } from "cloudinary-react";
import { useSelector } from "react-redux";
import { GetSearchingUser } from "../../reducers/searchUserReducers";
import { RootState } from "../../reducers/store";
import * as api from "../../api";
import FollowUsersModal from "./FollowUsersModal";
import Post from "./Post";
import { useInternalRouter } from "../../pages/routing";

const defaultProfilePicture =
  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
interface Props {
  handleFollowUser: (searchUserId: string, userId: string) => void;
  searchUserInfo: GetSearchingUser;
  isFollowing: boolean;
  isLoading: boolean;
}

function Body({
  handleFollowUser,
  searchUserInfo,
  isFollowing,
  isLoading,
}: Props) {
  const [isFollowUsersListModalOpen, setIsFollowUsersListModalOpen] =
    useState<boolean>(false);
  const [followUsersModalTitle, setFollowUsersModalTitle] =
    useState<string>("");
  const authUser = useSelector((state: RootState) => state.auth);
  const [followUsers, setFollowUsers] = useState<any>([]);
  const [isFollowUsersLoading, setIsFollowUsersLoading] =
    useState<boolean>(false);
  const [followUserSearchValue, setFollowUserSearchValue] =
    useState<string>("");

  const { push } = useInternalRouter();
  const handleClickFollowUsersList = async (
    titleName: string,
    followUserList: string[]
  ) => {
    setIsFollowUsersLoading(true);
    setFollowUsersModalTitle(titleName);
    setIsFollowUsersListModalOpen(true);
    if (followUserList.length === 0) {
      setFollowUsers([]);
      setIsFollowUsersLoading(false);
      return;
    }
    const { data } = await api.getFollowUsersList(
      searchUserInfo._id,
      followUserList
    );
    setFollowUsers(data);
    setIsFollowUsersLoading(false);
  };
  const handleClickFollowUser = (username: string) => {
    push(`/user/search/${username}`);
    setIsFollowUsersListModalOpen(false);
  };
  const handleSearchFollowUser = (event: any) => {
    setFollowUserSearchValue(event.target.value);
  };
  const handleClickDeleteSearchValue = () => {
    setFollowUserSearchValue("");
  };
  return (
    <>
      {isLoading ? (
        <p>loading...</p>
      ) : (
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
              <h1 className="font-bold text-3xl mt-5 mb-5">
                {searchUserInfo.name}
              </h1>
              <p className="w-full text-xl mb-5 break-words text-center">
                {searchUserInfo.bio}
              </p>
            </div>
            <div className="flex justify-evenly mt-5 mb-5">
              <div
                className="flex justify-center items-center flex-col cursor-pointer"
                onClick={() =>
                  handleClickFollowUsersList(
                    "Followers",
                    searchUserInfo.followers
                  )
                }
              >
                <h2 className="font-bold text-xl">Followers</h2>
                <p>{searchUserInfo.followers?.length}</p>
              </div>
              <div
                className="flex justify-center items-center flex-col cursor-pointer"
                onClick={() =>
                  handleClickFollowUsersList(
                    "Following",
                    searchUserInfo.following
                  )
                }
              >
                <h2 className="font-bold text-xl">Following</h2>
                <p>{searchUserInfo.following?.length}</p>
              </div>
            </div>
            <div className="flex text-white">
              <div
                className="flex-1 p-3 flex items-center justify-center cursor-pointer bg-purple-500 rounded-lg mb-3"
                onClick={() =>
                  handleFollowUser(searchUserInfo._id, authUser._id)
                }
              >
                <p>{isFollowing ? "Unfollow" : "Follow"}</p>
              </div>
              {/* <div className="flex-[0.5] p-3 flex items-center justify-center cursor-pointer bg-blue-700 rounded-lg mb-3">
                <p>Message</p>
              </div> */}
            </div>
            {searchUserInfo.isPrivate ? (
              isFollowing ? (
                searchUserInfo.userPosts?.length ? (
                  <div className="md:min-h-[500px] xl:grid-cols-3 xl:gap-4 grid grid-cols-2 gap-1 w-full">
                    {searchUserInfo.userPosts?.map((post) => (
                      <div key={post._id} className="mx-auto">
                        <Post post={post} authUser={authUser} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="xl:h-[500px] w-full  justify-center items-center flex border">
                    <p>User has no posts</p>
                  </div>
                )
              ) : (
                <div className="h-[500px] w-full justify-center items-center flex border">
                  <p className="font-bold">This Account is Private</p>
                </div>
              )
            ) : searchUserInfo.userPosts?.length ? (
              <div className="md:min-h-[500px] xl:grid-cols-3 xl:gap-4 grid grid-cols-2 gap-1 w-full">
                {searchUserInfo.userPosts?.map((post) => (
                  <div key={post._id} className="mx-auto">
                    <Post post={post} authUser={authUser} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="xl:h-[500px] w-full  justify-center items-center flex border">
                <p>User has no posts</p>
              </div>
            )}
          </div>
        </section>
      )}
      <FollowUsersModal
        setIsFollowUsersListModalOpen={setIsFollowUsersListModalOpen}
        isFollowUsersListModalOpen={isFollowUsersListModalOpen}
        followUsersModalTitle={followUsersModalTitle}
        followUsers={followUsers}
        isFollowUsersLoading={isFollowUsersLoading}
        handleClickFollowUser={handleClickFollowUser}
        followUserSearchValue={followUserSearchValue}
        handleSearchFollowUser={handleSearchFollowUser}
        handleClickDeleteSearchValue={handleClickDeleteSearchValue}
      />
    </>
  );
}

export default Body;
