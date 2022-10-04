import moment from "moment";
import { useEffect } from "react";
import { AiOutlineClockCircle, AiOutlineEye } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { FaRegThumbsUp } from "react-icons/fa";
import { Editor, convertFromRaw, EditorState, ContentBlock } from "draft-js";
import { linkDecorator } from "../CommonComponents/Forum/EditPage/EditorLink";
import { RenderImage } from "../CommonComponents/Forum/EditPage/EditorImage";
import { RootState, useAppDispatch } from "../../reducers/store";
import { likeBoardPost } from "../../actions/boardPostAction";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getCountReplies } from "../../util/countReplies";

function BoardPost({ boardPost, handleClickDeleteBoardPostConfirm }: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [likedBoardPost, setLikedBoardPost] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const params = useParams();
  const authUser = useSelector((state: RootState) => state.auth);

  const handleClickLikeBoardPost = () => {
    if (isLoading) return;
    if (!authUser.name) return;
    setIsLoading(true);
    dispatch(likeBoardPost(params.boardpostid, authUser._id));
    setIsLoading(false);
  };

  const blockRendererFunction = (contentBlock: ContentBlock) => {
    if (contentBlock.getType() === "atomic") {
      return {
        component: RenderImage,
        editable: false,
      };
    }
    return null;
  };
  const getBlockStyle = (block: any) => {
    switch (block.getType()) {
      case "header-one":
        return "text-3xl font-bold";
      case "header-two":
        return "text-2xl font-bold";
      case "header-three":
        return "text-xl font-bold";
      default:
        return null;
    }
  };
  useEffect(() => {
    if (!authUser.name) return;
    const likeUserIndex = boardPost.likes.findIndex(
      (likeId: string) => likeId === authUser._id
    );
    if (likeUserIndex !== -1) {
      setLikedBoardPost(true);
    } else {
      setLikedBoardPost(false);
    }
  }, [boardPost?.likes]);
  return (
    <section className="w-full">
      <div className="bg-black text-white p-1 font-bold rounded-lg text-center mt-5 mb-5">
        <p>{boardPost?.category}</p>
      </div>
      {boardPost.userId === authUser._id && (
        <div className="flex gap-2 justify-end mb-2">
          <div
            className="cursor-pointer text-red-500 hover:text-red-700"
            onClick={handleClickDeleteBoardPostConfirm}
          >
            Delete
          </div>
          <div className="cursor-pointer hover:text-gray-500">Edit</div>
        </div>
      )}
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl">{boardPost?.title}</h1>
        <div className="flex font-bold">
          <div className="flex items-center mr-2">
            <FaRegThumbsUp className="mr-1" />
            <p>{boardPost?.likes.length}</p>
          </div>
          <div className="flex items-center">
            <BiCommentDetail className="mr-1" />
            <p>{getCountReplies(boardPost?.comments)}</p>
          </div>
        </div>
      </div>

      <section className="border font-bold p-1 flex justify-between items-center mt-5">
        <p>{boardPost?.username}</p>
        <div className="flex">
          <div className="flex text-sm items-center mr-2">
            <AiOutlineClockCircle size={17} className="mr-1" />
            <p>{moment(boardPost?.createdAt).format("DD/MM/YY")}</p>
          </div>
          <div className="flex text-sm items-center">
            <AiOutlineEye size={17} className="mr-1" />
            <p>{boardPost?.views}</p>
          </div>
        </div>
      </section>
      <section className="border w-[900px]">
        {boardPost?.content && (
          <Editor
            readOnly
            editorState={EditorState.createWithContent(
              convertFromRaw(JSON.parse(boardPost?.content)),
              linkDecorator
            )}
            onChange={null}
            blockStyleFn={getBlockStyle}
            blockRendererFn={blockRendererFunction}
          />
        )}
        <div className="w-full"></div>
      </section>
      <div className="flex items-center justify-center mt-5">
        <div
          className={`group w-24 h-24 border flex flex-col items-center justify-center hover:border-purple-500 cursor-pointer transition duration-500 ease-linear ${
            likedBoardPost ? "border-purple-500" : "border-black"
          }`}
          onClick={handleClickLikeBoardPost}
        >
          <FaRegThumbsUp
            className={`mr-1 group-hover:text-purple-500 ${
              likedBoardPost ? "text-purple-500" : "text-black"
            }`}
            size={30}
          />
          <p className="text-xl mt-2">{boardPost?.likes.length}</p>
        </div>
      </div>
    </section>
  );
}

export default BoardPost;
