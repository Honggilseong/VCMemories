import { HashTagPost } from "../../actions/hashtagPostsDispatch";
import Post from "./Post";
interface Props {
  hashtagPosts: HashTagPost[];
}
function Posts({ hashtagPosts }: Props) {
  return (
    <div className="max-w-[800px] mx-auto border p-3 xl:p-0">
      {hashtagPosts.map((hashtagPost) => (
        <Post key={hashtagPost._id} hashtagPost={hashtagPost} />
      ))}
    </div>
  );
}

export default Posts;
