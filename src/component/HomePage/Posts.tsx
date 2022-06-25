import { FullPage, Slide } from "react-full-page";
import { useSelector } from "react-redux";
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
}

function Posts() {
  const fetchPosts = useSelector((state: any) => state.post);
  return (
    <div className="max-w-2xl mx-auto">
      {fetchPosts.length > 0 ? (
        fetchPosts.map((post: UserPost) => (
          <div key={post._id}>
            <Post post={post} />
          </div>
        ))
      ) : (
        <p className="text-center">there's no posts</p>
      )}
    </div>
  );
}

export default Posts;
