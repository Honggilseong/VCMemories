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
}

function Posts() {
  const fetchPosts = useSelector((state: any) => state.post);
  return (
    <div className="max-w-2xl mx-auto">
      <FullPage>
        {fetchPosts.map((post: UserPost) => (
          <Slide>
            <Post key={post._id} post={post} />
          </Slide>
        ))}
      </FullPage>
    </div>
  );
}

export default Posts;
