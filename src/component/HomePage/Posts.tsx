import { useSelector } from "react-redux";
import { Comment } from "../../actions/postActionDispatch";
import Post from "./Post";
const noPostImg = require("../../images/nopostimg.png");
interface UserPost {
  createdAt: string;
  likes: string[];
  message: string;
  name: string;
  picture: string;
  tags: string[];
  title: string;
  _id: string;
  userId: string;
  profilePicture: string;
  comments: Comment[];
}

function Posts() {
  const fetchPosts = useSelector((state: any) => state.post);
  return (
    <div className="max-w-[800px] mx-auto p-3 xl:p-0">
      {fetchPosts.length > 0 ? (
        fetchPosts.map((post: UserPost) => (
          <div key={post._id} className="mb-10">
            <Post post={post} />
          </div>
        ))
      ) : (
        <div className="flex justify-center w-full mt-5 flex-col">
          <h2 className="text-center font-bold text-2xl">
            Welcome To VCMemories
          </h2>
          <p className="text-center mt-3">
            Want to follow your friends? Use the search bar to find your
            friends!
          </p>
          <div className="w-full xl:w-[800px] mt-10">
            <img src={noPostImg} alt="noPostImg" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Posts;
