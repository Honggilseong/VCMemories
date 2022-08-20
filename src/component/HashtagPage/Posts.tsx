import { HashTagPost } from "../../actions/hashtagPostsDispatch";
import Post from "./Post";
interface Props {
  hashtagPosts: HashTagPost[];
}
function Posts({ hashtagPosts }: Props) {
  return (
    <div className="max-w-[800px] mx-auto p-3 xl:p-0">
      {hashtagPosts.length > 0 ? (
        hashtagPosts.map((hashtagPost) => (
          <Post key={hashtagPost._id} hashtagPost={hashtagPost} />
        ))
      ) : (
        <div className="w-full h-[200px] xl:h-[500px] flex justify-center items-center">
          <p className="font-bold">No hashtag posts here yet...</p>
        </div>
      )}
    </div>
  );
}

export default Posts;
