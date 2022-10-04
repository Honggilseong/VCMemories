import { useEffect, useState } from "react";
import TableTr from "./TableTr";
import ReactPaginate from "react-paginate";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { BoardPost } from "../../actions/boardPostDispatch";
import { useInternalRouter } from "../../pages/routing";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/store";

interface Props {
  boardPosts: BoardPost[];
}

function Table({ boardPosts }: Props) {
  const [currentItems, setCurrentItems] = useState<BoardPost[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const { push } = useInternalRouter();
  const authUser = useSelector((state: RootState) => state.auth);
  const itemsPerPage = 20;
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % boardPosts.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  const handleClickPost = () => {
    if (!authUser.name) return;
    push(`/forum/${authUser._id}/edit`);
  };
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(boardPosts?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(boardPosts?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, boardPosts]);
  return (
    <>
      <table className="w-full">
        <tbody>
          {currentItems?.map((boardPost) => (
            <TableTr key={boardPost._id} boardPost={boardPost} />
          ))}
        </tbody>
      </table>
      <div className="flex justify-end w-full">
        <button
          className="p-1 w-16 rounded-lg bg-purple-500 text-white"
          onClick={handleClickPost}
        >
          Post
        </button>
      </div>
      <ReactPaginate
        breakLabel=""
        nextLabel={<IoIosArrowDropright />}
        nextClassName="text-2xl text-purple-500 ml-3"
        previousLabel={<IoIosArrowDropleft />}
        previousClassName="text-2xl text-purple-500 mr-3"
        disabledClassName="text-gray-500 "
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        containerClassName="w-full"
        pageClassName="border w-10 h-10"
        pageLinkClassName="w-full h-full flex items-center justify-center"
        activeClassName="bg-purple-500 text-white transition duration-200 ease-in-out border-2 border-purple-300"
        className="flex items-center justify-center mt-3"
        marginPagesDisplayed={1}
      />
    </>
  );
}

export default Table;
