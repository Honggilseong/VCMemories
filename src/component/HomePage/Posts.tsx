import { useSelector } from "react-redux";
import { Comment } from "../../actions/postActionDispatch";
import Post from "./Post";

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
    <div className="max-w-[800px] mx-auto">
      {fetchPosts.length > 0 ? (
        fetchPosts.map((post: UserPost) => (
          <div key={post._id} className="mb-10">
            <Post post={post} />
          </div>
        ))
      ) : (
        <p className="text-center">No posts</p>
      )}
    </div>
  );
}

export default Posts;
