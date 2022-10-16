import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BoardPost } from "../actions/boardPostDispatch";
import { getUserBoardPostList } from "../api";
import CloudinaryImage from "../component/CommonComponents/CloudinaryImage";
import Header from "../component/CommonComponents/Forum/Main/Header";
import { getCountReplies } from "../util/countReplies";
import { toastError } from "../util/toast";
import { useInternalRouter } from "./routing";
const defaultProfilePicture =
  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
interface UserBoardPostList {
  _id: string;
  name: string;
  profilePicture: string;
  bio: string;
  boardPosts: BoardPost[];
}

function ForumUserInfo() {
  const [userBoardPostList, setUserBoardPostList] =
    useState<UserBoardPostList>();
  const params = useParams();
  const { push } = useInternalRouter();
  const handleClickBoardPost = (boardPostId: string) => {
    push(`/forum/vrchat/${boardPostId}`);
  };
  useEffect(() => {
    const getUserBoardPost = async () => {
      try {
        const { data } = await getUserBoardPostList(params.username);
        setUserBoardPostList(data);
      } catch (error: any) {
        toastError(error.response.data.message);
      }
    };
    getUserBoardPost();
  }, []);

  return (
    <div>
      <Header />
      <section className="max-w-[900px] border mx-auto p-2 md:p-0">
        <section className="my-5">
          <div className="flex items-center">
            <div className="rounded-full h-20 w-20 overflow-hidden mr-2 border-2 border-green-500">
              {userBoardPostList?.profilePicture === defaultProfilePicture ? (
                <img
                  src={userBoardPostList?.profilePicture}
                  alt="userProfilePicture"
                />
              ) : (
                <CloudinaryImage image={userBoardPostList?.profilePicture} />
              )}
            </div>
            <p className="font-bold text-2xl">{userBoardPostList?.name}</p>
          </div>
          {userBoardPostList?.bio ? (
            <p className="pt-5">{userBoardPostList?.bio}</p>
          ) : (
            <p className="pt-5">User doesn't have bio</p>
          )}
        </section>
        <div className="w-full bg-black text-white font-bold rounded-lg p-2 mb-3">
          Post list
        </div>
        {userBoardPostList?.boardPosts.length !== 0 ? (
          userBoardPostList?.boardPosts.map((boardPost) => (
            <div
              className="flex justify-between items-center mb-2 hover:text-purple-500 cursor-pointer border-b border-b-purple-500 px-2"
              key={boardPost._id}
              onClick={() => handleClickBoardPost(boardPost._id)}
            >
              <div>
                <span className="font-bold w-[260px] md:w-[400px] lg:w-[500px] xl:w-full  text-ellipsis overflow-hidden">
                  {boardPost.category}
                </span>
                {boardPost.title}
                <span>[{getCountReplies(boardPost.comments)}]</span>
              </div>
              <div>
                <p>{moment(boardPost.createdAt).format("DD/MM/YY")}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="h-96">User has no posts</div>
        )}
      </section>
    </div>
  );
}

export default ForumUserInfo;
