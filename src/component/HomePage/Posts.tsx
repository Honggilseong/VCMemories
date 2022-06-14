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
}

function Posts() {
  const fetchPosts = useSelector((state: any) => state.post);
  return (
    <div className="max-w-4xl mx-auto">
      {fetchPosts.map((post: UserPost) => (
        <Post post={post} />
      ))}
    </div>
  );
}

export default Posts;
