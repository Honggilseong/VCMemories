import { useEffect, useState, useCallback } from "react";
import { useInternalRouter } from "../../pages/routing";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/store";
import { toastError } from "../../util/toast";
import { getBoardPostsQuery } from "../../api";
import { useLocation } from "react-router-dom";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

import TableTr from "./TableTr";
import Pagination from "rc-pagination";

function Table() {
  const location = useLocation();
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [queryBoardPosts, setQueryBoardPosts] = useState<any>();
  const { push } = useInternalRouter();
  const authUser = useSelector((state: RootState) => state.auth);
  const handleClickPost = () => {
    if (!authUser.name) return toastError("You need to sign in");
    push(`/forum/${authUser._id}/create`);
  };

  const handlePageClick = (count: any) => {
    setCurrentPage(count);
    push({
      pathname: "/forum/vrchat",
      search: `?page=${count}`,
    });
  };
  const itemRender = useCallback(
    (page: number, type: string, element: React.ReactNode) => {
      if (type === "page") {
        return (
          <div
            className={`py-1 px-3 border cursor-pointer ${
              page === currentPage && "bg-purple-500 text-white"
            }`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </div>
        );
      }
      if (type === "prev") {
        return (
          <IoIosArrowDropleft
            size={25}
            color={currentPage === 1 ? "grey" : "purple"}
          />
        );
      }
      if (type === "next") {
        return (
          <IoIosArrowDropright
            size={25}
            color={currentPage === pageCount ? "grey" : "purple"}
          />
        );
      }
      return element;
    },
    [currentPage]
  );
  useEffect(() => {
    const getBoardPosts = async () => {
      try {
        if (location.search) {
          const getPageNumber = location.search[location.search.length - 1];
          const { data } = await getBoardPostsQuery(Number(getPageNumber));
          setQueryBoardPosts(data);
          setPageCount(Math.ceil(data?.pagination.pageCount));
          setCurrentPage(Number(getPageNumber));
          return;
        }
        const { data } = await getBoardPostsQuery(currentPage);
        setQueryBoardPosts(data);
        setPageCount(Math.ceil(data?.pagination.pageCount));
      } catch (error) {
        console.log(error);
      }
    };
    getBoardPosts();
  }, [currentPage]);
  return (
    <>
      <table className="w-full">
        <tbody>
          {queryBoardPosts?.boardPosts?.map((boardPost: any) => (
            <TableTr
              key={boardPost._id}
              boardPost={boardPost}
              currentPage={currentPage}
            />
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
      <Pagination
        current={currentPage}
        pageSize={1}
        total={pageCount}
        onChange={handlePageClick}
        className="flex items-center justify-center"
        itemRender={itemRender}
      />
    </>
  );
}

export default Table;
