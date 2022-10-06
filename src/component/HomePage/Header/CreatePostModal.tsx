import { useCallback, useRef, useState } from "react";
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
  isEdit: boolean;
  postType: string;
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
    isEdit: false,
    postType: "",
  });
  const modal = useSelector((state: RootState) => state.modal);
  const textRef = useRef(null);
  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);

  const dispatch = useAppDispatch();

  const onDrop = useCallback((acceptedFiles: AcceptedFiles[]) => {
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
      isEdit: false,
      postType: "",
    });
    setPreviewImage([]);
    setIsLoading(false);
  };

  const handleInputNewPost = (e: any) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
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
          postType: previewImage[0].type,
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
      isEdit: false,
      postType: "",
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
          onChange={handleInputNewPost}
        />
      </div>
      <h2 className="mt-3 text-gray-500">Message</h2>
      <div className="mt-2 flex justify-center items-center outline-1 outline outline-purple-500 focus-within:outline-2 rounded-lg p-1">
        <div className="w-full">
          <textarea
            name="message"
            value={newPost.message}
            ref={textRef}
            onInput={handleResizeHeight}
            onChange={handleInputNewPost}
            placeholder="Message"
            className="w-full h-full focus:outline-none resize-none"
          />
        </div>
      </div>
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
