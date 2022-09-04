import { Image } from "cloudinary-react";
import { BiSearchAlt2 } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";
import Modal from "react-modal";

interface User {
  _id: string;
  name: string;
  profilePicture: string;
}

const defaultProfilePicture =
  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
  },
};
function FollowUsersModal({
  isFollowUsersListModalOpen,
  setIsFollowUsersListModalOpen,
  followUsersModalTitle,
  followUsers,
  isFollowUsersLoading,
  handleClickFollowUser,
  followUserSearchValue,
  handleSearchFollowUser,
  handleClickDeleteSearchValue,
}: any) {
  const handleCloseModal = () => {
    setIsFollowUsersListModalOpen(false);
  };
  return (
    <Modal
      isOpen={isFollowUsersListModalOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Follow Users List"
      style={customStyles}
    >
      <div className="h-[400px] w-[300px] overflow-auto scrollbar-hide">
        <h1 className="font-bold text-xl">{followUsersModalTitle}</h1>
        <div className="w-full my-4 border border-purple-500" />
        <div className="border-2 border-purple-500 mb-4 p-1 w-full flex justify-between items-center">
          <input
            type="text"
            placeholder="Search a user"
            className="flex-1 w-full focus:outline-none"
            onChange={handleSearchFollowUser}
            value={followUserSearchValue}
          />
          {followUserSearchValue ? (
            <div
              onClick={handleClickDeleteSearchValue}
              className="cursor-pointer"
            >
              <TiDeleteOutline size={20} color="gray" />
            </div>
          ) : (
            <BiSearchAlt2 size={20} color="gray" />
          )}
        </div>
        {!isFollowUsersLoading ? (
          <>
            {followUsers.length > 0 ? (
              followUsers
                .filter((filterUser: User) =>
                  filterUser.name
                    .toLowerCase()
                    .trim()
                    .includes(followUserSearchValue.toLowerCase().trim())
                )
                .map((user: User) => (
                  <div
                    key={user._id}
                    className="flex items-center cursor-pointer mb-2"
                    onClick={() => handleClickFollowUser(user.name)}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-2">
                      {user.profilePicture === defaultProfilePicture ? (
                        <img
                          src={user.profilePicture}
                          alt="userProfilePicture"
                        />
                      ) : (
                        <Image
                          cloudName={process.env.REACT_APP_CLOUDINARY_USERNAME}
                          publicId={user.profilePicture}
                          className="w-full h-full"
                          crop="scale"
                        />
                      )}
                    </div>
                    <p className="font-bold">{user.name}</p>
                  </div>
                ))
            ) : (
              <div className="h-[70%] flex items-center justify-center">
                <p>No users</p>
              </div>
            )}
          </>
        ) : (
          <p>loading...</p>
        )}
      </div>
    </Modal>
  );
}

export default FollowUsersModal;
