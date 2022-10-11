import moment from "moment";
import { BoardPost } from "../../actions/boardPostDispatch";
import { useInternalRouter } from "../../pages/routing";
import { getCountReplies } from "../../util/countReplies";

interface Props {
  boardPost: BoardPost;
  currentPage: number;
}
function TableTr({ boardPost, currentPage }: Props) {
  const { push } = useInternalRouter();

  const handleClickBoardPost = () => {
    push({
      pathname: `/forum/vrchat/${boardPost._id}`,
      search: `?page=${currentPage || 1}`,
    });
  };
  return (
    <tr
      className="flex hover:text-purple-500 cursor-pointer border-b border-b-purple-500 my-1 items-center w-full justify-center"
      onClick={handleClickBoardPost}
    >
      <td className="flex-[0.1] text-center text-ellipsis overflow-hidden whitespace-nowrap flex justify-center font-bold">
        {boardPost?.category}
      </td>
      <td className="flex-[0.6] text-center text-ellipsis overflow-hidden whitespace-nowrap flex justify-start items-center">
        <span>{boardPost?.title}</span>
        <span className="ml-2">[{getCountReplies(boardPost.comments)}]</span>
      </td>
      <td className="flex-[0.1] text-center text-xs text-ellipsis overflow-hidden whitespace-nowrap">
        {boardPost?.username}
      </td>
      <td className="flex-[0.05] text-center text-xs text-ellipsis overflow-hidden whitespace-nowrap">
        {boardPost?.likes.length}
      </td>
      <td className="flex-[0.1] text-center text-xs text-ellipsis overflow-hidden whitespace-nowrap">
        {moment(boardPost?.createdAt).format("DD/MM/YY")}
      </td>
      <td className="flex-[0.05] text-center text-xs text-ellipsis overflow-hidden whitespace-nowrap">
        {boardPost?.views}
      </td>
    </tr>
  );
}

export default TableTr;
