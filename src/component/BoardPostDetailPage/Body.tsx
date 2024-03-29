import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RotateLoader } from "react-spinners";
import { deleteBoardPost } from "../../actions/boardPostAction";
import { useInternalRouter } from "../../pages/routing";
import { RootState, useAppDispatch } from "../../reducers/store";
import BoardPost from "./BoardPost";
import Comments from "./Comments";
interface Props {
  isBoardPostLoading: boolean;
}
function Body({ isBoardPostLoading }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [commentValue, setCommentValue] = useState<string>("");
  const [isDeleteBoardPost, setIsDeleteBoardPost] = useState<boolean>(false);
  const { push } = useInternalRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const authUser = useSelector((state: RootState) => state.auth);
  const boardPost = useSelector((state: RootState) => state.boardPost);
  const handleSetCommentValue = (e: any) => {
    setCommentValue(e.target.value);
  };
  const handleClickDeleteBoardPostConfirm = () => {
    setIsDeleteBoardPost((prev) => !prev);
  };
  const handleClickDeleteBoardPost = async () => {
    if (!authUser.name || isLoading) return;
    setIsLoading(true);
    await dispatch(deleteBoardPost(params.boardpostid, authUser._id));
    setIsLoading(false);
    push("/forum/vrchat");
  };
  const handleClickGoToForum = () => {
    push("/forum/vrchat");
  };
  const handleClickEditBoardPost = () => {
    push(`/forum/${params.boardpostid}/edit`);
  };
  return (
    <div className="w-full h-full">
      <div className="max-w-[900px] mx-auto p-3 xl:p-0">
        {isBoardPostLoading ? (
          <div className="flex items-center justify-center h-[500px]">
            <RotateLoader color="#36d7b7" />
          </div>
        ) : !boardPost?.title ? (
          <div className="w-full mt-10 items-center flex justify-center flex-col">
            <h1 className="text-2xl font-bold">This post deleted...😢</h1>
            <button
              className="rounded-lg p-2 text-white bg-purple-500 mt-10"
              onClick={handleClickGoToForum}
            >
              Forum
            </button>
          </div>
        ) : isDeleteBoardPost ? (
          <div className="w-full mt-10">
            <div className="mx-auto border w-[400px]">
              <div className="flex justify-center font-bold">
                Are you sure you want to delete your post?
              </div>
              <div className="flex justify-end gap-4 mt-10">
                <button
                  className="p-1 rounded-lg bg-gray-400 text-white hover:bg-gray-500"
                  onClick={handleClickDeleteBoardPostConfirm}
                >
                  Cancel
                </button>
                <button
                  className="p-1 rounded-lg bg-red-500 text-white hover:bg-red-600"
                  onClick={handleClickDeleteBoardPost}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <BoardPost
              boardPost={boardPost}
              handleClickDeleteBoardPostConfirm={
                handleClickDeleteBoardPostConfirm
              }
              handleClickEditBoardPost={handleClickEditBoardPost}
            />
            <Comments
              commentValue={commentValue}
              handleSetCommentValue={handleSetCommentValue}
              comments={boardPost.comments}
              setCommentValue={setCommentValue}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Body;
