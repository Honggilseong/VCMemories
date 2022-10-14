import { Image } from "cloudinary-react";
import { useState } from "react";
import { BsCheckCircle, BsFillXCircleFill } from "react-icons/bs";
import Modal from "react-modal";
import {
  acceptFollowRequest,
  deleteFollowRequest,
} from "../../actions/authAction";
import { useAppDispatch } from "../../reducers/store";
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
  overlay: { zIndex: 1000 },
};
function ProfileFollowRequestsModal({
  isFollowRequestsModalOpen,
  setIsFollowRequestsModalOpen,
  authUser,
}: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleCloseModal = () => {
    setIsFollowRequestsModalOpen(false);
  };
  const handleAcceptFollowRequest = (requestUserId: string) => {
    if (isLoading) return;
    setIsLoading(true);
    dispatch(acceptFollowRequest(authUser._id, requestUserId));
    setIsLoading(false);
  };
  const handleDeleteFollowRequest = (requestUserId: string) => {
    if (isLoading) return;
    setIsLoading(true);
    dispatch(deleteFollowRequest(authUser._id, requestUserId));
    setIsLoading(false);
  };
  return (
    <Modal
      isOpen={isFollowRequestsModalOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Follow Request"
      style={customStyles}
    >
      <div className="w-full xl:w-[500px] h-[500px] overflow-auto">
        {authUser.followRequests?.length ? (
          authUser.followRequests.map((request: any) => (
            <div
              key={request._id}
              className="flex items-center justify-between xl:w-[500px] w-[300px] mb-3"
            >
              <div className="flex">
                <div className="h-12 w-12 mr-4 rounded-full overflow-hidden">
                  {request.profileImage === defaultProfilePicture ? (
                    <img src={request.profileImage} alt="userProfilePicture" />
                  ) : (
                    <Image
                      cloudName={process.env.REACT_APP_CLOUDINARY_USERNAME}
                      publicId={request.profileImage}
                      className="w-full h-full"
                      crop="scale"
                    />
                  )}
                </div>
                <p className="font-bold text-lg">{request.username}</p>
              </div>
              <div className="flex justify-center items-center">
                <div
                  className="cursor-pointer mr-2"
                  onClick={() => handleAcceptFollowRequest(request.userId)}
                >
                  <BsCheckCircle size={25} color="green" />
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => handleDeleteFollowRequest(request.userId)}
                >
                  <BsFillXCircleFill size={25} color="red" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-[300px] xl:w-[500px] h-full flex items-center justify-center">
            <p className="font-bold">No requests</p>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default ProfileFollowRequestsModal;
