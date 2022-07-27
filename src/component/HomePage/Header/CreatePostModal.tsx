import { useCallback, useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { useAppDispatch } from "../../../reducers/store";
import { closePostModal } from "../../../actions/modalAction";
import { createPost } from "../../../actions/postAction";
import DropZone from "./CreatePostModal/DropZone";
import { toastError } from "../../../util/toast";

interface AcceptedFiles {
  path: string;
  preview: string;
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}
interface Comment {
  commentUserId: string;
  commentUserName: string;
  comment: string;
}
interface NewPost {
  title: string;
  picture: string;
  message: string;
  tags: string[];
  name: string;
  profilePicture: string;
  userId: string;
  likes: string[];
  comments: Comment[];
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
  const [previewImage, setPreviewImage] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newPost, setNewPost] = useState<NewPost>({
    title: "",
    picture: "",
    message: "",
    tags: [],
    name: "",
    profilePicture: "",
    userId: "",
    likes: [],
    comments: [],
  });
  const modal = useSelector((state: RootState) => state.modal);
  const dispatch = useAppDispatch();

  const onDrop = useCallback((acceptedFiles: AcceptedFiles[]) => {
    console.log(acceptedFiles);
    setPreviewImage(
      acceptedFiles.map((file: any) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      )
    );
  }, []);
  const handleCloseModal = () => {
    dispatch(closePostModal());
    setNewPost({
      title: "",
      picture: "",
      message: "",
      tags: [],
      name: "",
      profilePicture: "",
      userId: "",
      likes: [],
      comments: [],
    });
    setPreviewImage([]);
    setIsLoading(false);
  };

  const handleInputNewUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
    console.log(newPost);
  };

  const handleUploadPost = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!previewImage[0]) {
      toastError("You have to upload your image!");
      return;
    }
    setIsLoading(true);
    const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_USERNAME}/upload`;
    const formData = new FormData();
    formData.append("file", previewImage[0]);
    formData.append(
      "upload_preset",
      `${process.env.REACT_APP_CLOUDINARY_NAME}`
    );
    const userInfo = JSON.parse(localStorage.getItem("profile") || "");
    try {
      const response = await fetch(url, {
        method: "post",
        body: formData,
      }).then();
      const data = await response.json();
      dispatch(
        createPost({
          ...newPost,
          name: userInfo.user.name,
          picture: data.public_id,
          userId: userInfo.user._id,
        })
      );
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      toastError("Sorry something went wrong... please try again... 😢");
      setIsLoading(false);
    }
    setNewPost({
      title: "",
      picture: "",
      message: "",
      tags: [],
      name: "",
      profilePicture: "",
      userId: "",
      likes: [],
      comments: [],
    });
    setPreviewImage([]);
    dispatch(closePostModal());
  };
  return (
    <Modal
      isOpen={modal.isPostModalOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Example Modal"
      style={customStyles}
    >
      <DropZone previewImage={previewImage} onDrop={onDrop} />
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
      {/* <h2 className="mt-3 text-gray-500">Tags(comma)</h2>
      <div className="h-11 mt-2 flex justify-center items-center outline-1 outline outline-purple-500 focus-within:outline-2 rounded-lg p-1">
        <input
          type="text"
          name="tags"
          placeholder="Tags"
          className="w-full h-full rounded-lg outline-none"
          value={newPost.tags}
          onChange={handleInputNewUser}
        />
      </div> */}
      {isLoading ? (
        <div className="h-12 bg-gray-400 text-white mt-3 rounded-lg flex items-center justify-center cursor-pointer">
          <p>Uploading...</p>
        </div>
      ) : (
        <div
          className="h-12 bg-red-400 text-white mt-3 rounded-lg flex items-center justify-center cursor-pointer"
          onClick={handleUploadPost}
        >
          <p>Upload your post</p>
        </div>
      )}
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
