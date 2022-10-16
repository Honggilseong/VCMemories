import { useEffect, useState, useCallback } from "react";
import { useInternalRouter } from "../../pages/routing";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../reducers/store";
import { toastError } from "../../util/toast";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { getBoardPostList } from "../../actions/boardPostListAction";
import { BoardPost } from "../../actions/boardPostListDispatch";

import TableTr from "./TableTr";
import Pagination from "rc-pagination";
import BoardPostSearchBar from "./BoardPostSearchBar";

interface Props {
  category: string;
}

function Table({ category }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchParams] = useSearchParams();
  const { push } = useInternalRouter();
  const authUser = useSelector((state: RootState) => state.auth);
  const boardPostList = useSelector((state: RootState) => state.boardPostList);
  const dispatch = useAppDispatch();
  const handleClickPost = () => {
    if (!authUser.name) return toastError("Please sign in first.");
    push(`/forum/${authUser._id}/create`);
  };

  const handlePageClick = (count: any) => {
    setCurrentPage(count);
    if (searchParams.has("search")) {
      const searchWord = searchParams.get("search");
      push({
        pathname: "/forum/vrchat",
        search: `?search=${searchWord}&page=${count}`,
      });
    } else if (
      searchParams.has("filter") &&
      searchParams.get("filter") !== "all"
    ) {
      const filter = searchParams.get("filter");
      push({
        pathname: "/forum/vrchat",
        search: `?filter=${filter}&page=${count}`,
      });
    } else {
      push({
        pathname: "/forum/vrchat",
        search: `?page=${count}`,
      });
    }
  };
  const handleInputSearchValue = (e: any) => {
    setSearchValue(e.target.value);
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
            color={
              currentPage === Math.ceil(boardPostList?.pagination.pageCount)
                ? "grey"
                : "purple"
            }
          />
        );
      }
      return element;
    },
    [currentPage]
  );
  const handleClickSearchBoardPost = async () => {
    if (!searchValue) return;
    dispatch(getBoardPostList(1, searchValue));
    push({
      pathname: "/forum/vrchat",
      search: `?search=${searchValue}&page=1`,
    });
    setCurrentPage(1);
  };
  const getBoardPosts = async () => {
    try {
      if (searchParams.has("page")) {
        dispatch(getBoardPostList(Number(searchParams.get("page"))));
        setCurrentPage(Number(searchParams.get("page")));
      } else {
        dispatch(getBoardPostList(currentPage));
        setCurrentPage(1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getSearchBoardPosts = async () => {
    try {
      if (Number(searchParams.get("page")) > 1) {
        dispatch(
          getBoardPostList(
            Number(searchParams.get("page")),
            !searchValue ? searchParams.get("search") : searchValue
          )
        );
        setCurrentPage(Number(searchParams.get("page")));
      } else {
        dispatch(
          getBoardPostList(
            1,
            !searchValue ? searchParams.get("search") : searchValue
          )
        );
        setCurrentPage(1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getFilterBoardPosts = async () => {
    try {
      if (Number(searchParams.get("page")) > 1) {
        dispatch(
          getBoardPostList(Number(searchParams.get("page")), "", category)
        );
        setCurrentPage(Number(searchParams.get("page")));
      } else {
        dispatch(getBoardPostList(1, "", category));
        setCurrentPage(1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (searchParams.has("search")) {
      getSearchBoardPosts();
    } else if (
      searchParams.has("filter") &&
      searchParams.get("filter") !== "all"
    ) {
      getFilterBoardPosts();
    } else {
      getBoardPosts();
    }
  }, [currentPage, category]);
  return (
    <>
      <section className="w-full">
        {boardPostList?.boardPosts?.map((boardPost: BoardPost) => (
          <TableTr
            key={boardPost._id}
            boardPost={boardPost}
            currentPage={currentPage}
          />
        ))}
      </section>
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
        total={Math.ceil(boardPostList?.pagination.pageCount)}
        onChange={handlePageClick}
        className="flex items-center justify-center"
        itemRender={itemRender}
        locale={{ prev_page: "prev", next_page: "next" }}
      />
      <BoardPostSearchBar
        handleClickSearchBoardPost={handleClickSearchBoardPost}
        searchValue={searchValue}
        handleInputSearchValue={handleInputSearchValue}
      />
    </>
  );
}

export default Table;
