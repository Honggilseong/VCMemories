import moment from "moment";
import { BoardPost } from "../../actions/boardPostDispatch";
import useWindowSize from "../../hooks/useWindowSize";
import { useInternalRouter } from "../../pages/routing";
import { getCountReplies } from "../../util/countReplies";

interface Props {
  boardPost: BoardPost;
  currentPage: number;
}
function TableTr({ boardPost, currentPage }: Props) {
  const { push } = useInternalRouter();
  const { width } = useWindowSize();
  const handleClickBoardPost = () => {
    push({
      pathname: `/forum/vrchat/${boardPost._id}`,
      search: `?page=${currentPage || 1}`,
    });
  };
  return (
    <div
      className="flex hover:text-purple-500 cursor-pointer border-b border-b-purple-500 py-1 items-center w-full xl:flex-row  flex-col"
      onClick={handleClickBoardPost}
    >
      <div className="flex items-center w-full justify-start">
        <p className="text-center w-[100px] font-bold rounded-lg">
          {boardPost?.category}
        </p>
        <div className="flex items-center w-full xl:w-[450px]">
          <span className="text-ellipsis">{boardPost?.title}</span>
          <span className="ml-2">[{getCountReplies(boardPost.comments)}]</span>
        </div>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-sm text-center w-[100px]">{boardPost?.username}</p>
        <div className="flex items-center justify-center text-center">
          <p className="flex items-center justify-center text-xs xl:text-sm w-[50px]">
            {width > 1280
              ? boardPost?.likes.length
              : `Likes ${boardPost?.likes.length}`}
          </p>
          <p className="w-[100px] flex items-center text-xs xl:text-sm justify-center text-center">
            {width > 1280
              ? moment(boardPost?.createdAt).format("DD/MM/YY")
              : `Date ${moment(boardPost?.createdAt).format("DD/MM")}`}
          </p>
          <p className="w-[100px] text-xs xl:text-sm">
            {width > 1280 ? boardPost?.views : `Views ${boardPost?.views}`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TableTr;
