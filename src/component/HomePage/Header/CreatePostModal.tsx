import { useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { useInternalRouter } from "../../../pages/routing";
import { RootState } from "../../../reducers";
import { useAppDispatch } from "../../../reducers/store";
import { closePostModal } from "../../../actions/modalAction";
import { createPost } from "../../../actions/postAction";
interface NewPost {
  title: string;
  picture: string;
  message: string;
  tags: string[];
  name: string;
  profilePicture: string;
  userId: string;
  likes: string[];
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
function CreatePostModal() {
  const getUser = JSON.parse(localStorage.getItem("profile") || "");
  const [newPost, setNewPost] = useState<NewPost>({
    title: "",
    picture: "",
    message: "",
    tags: [],
    name: getUser.user.name,
    profilePicture: getUser.user.profilePicture,
    userId: getUser.user._id,
    likes: [],
  });
  const navigate = useInternalRouter();
  const modal = useSelector((state: RootState) => state.modal);
  const dispatch = useAppDispatch();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileBlob = e.target.files![0];

    setNewPost({ ...newPost, picture: URL.createObjectURL(fileBlob) });
  };

  const handleCloseModal = () => {
    dispatch(closePostModal());
    setNewPost({
      title: "",
      picture: "",
      message: "",
      tags: [],
      name: getUser.user.name,
      profilePicture: getUser.user.profilePicture,
      userId: getUser.user._id,
      likes: [],
    });
  };

  const handleInputNewUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
    console.log(newPost);
  };

  const handleUploadPost = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!getUser) {
      navigate.push("/");
      dispatch(closePostModal());
      return;
    }
    dispatch(createPost(newPost));
  };

  return (
    <Modal
      isOpen={modal.isPostModalOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Example Modal"
      style={customStyles}
    >
      <div
        className={`w-96 h-96 ${!newPost.picture && "border border-gray-400"}`}
      >
        {newPost.picture && (
          <img
            src={newPost.picture}
            alt="userPicture"
            className="object-cover w-full h-full"
          />
        )}
      </div>
      <h2 className="mt-3 text-gray-500">Title</h2>
      <div className="h-11 mt-2 flex justify-center items-center outline-1 outline outline-purple-500 focus-within:outline-2 rounded-lg p-1">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full h-full rounded-lg outline-none"
          value={newPost.title}
          onChange={handleInputNewUser}
        />
      </div>
      <h2 className="mt-3 text-gray-500">Message</h2>
      <div className="h-11 mt-2 flex justify-center items-center outline-1 outline outline-purple-500 focus-within:outline-2 rounded-lg p-1">
        <input
          type="text"
          name="message"
          placeholder="Message"
          className="w-full h-full rounded-lg outline-none"
          value={newPost.message}
          onChange={handleInputNewUser}
        />
      </div>
      <h2 className="mt-3 text-gray-500">Tags(comma)</h2>
      <div className="h-11 mt-2 flex justify-center items-center outline-1 outline outline-purple-500 focus-within:outline-2 rounded-lg p-1">
        <input
          type="text"
          name="tags"
          placeholder="Tags"
          className="w-full h-full rounded-lg outline-none"
          value={newPost.tags}
          onChange={handleInputNewUser}
        />
      </div>
      <div className="h-12 bg-purple-500 text-white mt-3 rounded-lg">
        <label
          htmlFor="pick"
          className="w-full h-full flex justify-center items-center cursor-pointer"
        >
          Upload a image
        </label>
        <input
          type="file"
          id="pick"
          className="hidden"
          accept="image/png, image/jpeg , image/jpg"
          onChange={handleFile}
        />
      </div>
      <div
        className="h-12 bg-red-400 text-white mt-3 rounded-lg flex items-center justify-center cursor-pointer"
        onClick={handleUploadPost}
      >
        <p>Upload your post</p>
      </div>
      <div
        className="h-12 bg-gray-500 text-white mt-3 rounded-lg flex items-center justify-center cursor-pointer"
        onClick={handleCloseModal}
      >
        <p>Close</p>
      </div>
    </Modal>
  );
}

export default CreatePostModal;
