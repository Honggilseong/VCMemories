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
      <FullPage>
        {fetchPosts.length > 0 ? (
          fetchPosts.map((post: UserPost) => (
            <Slide key={post._id}>
              <Post post={post} />
            </Slide>
          ))
        ) : (
          <p className="text-center">there's no posts</p>
        )}
      </FullPage>
    </div>
  );
}

export default Posts;
