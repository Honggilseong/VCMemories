import { useEffect } from "react";
import Body from "../component/BoardPostDetailPage/Body";
import Header from "../component/CommonComponents/Forum/Main/Header";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../reducers/store";
import { getBoardPost } from "../actions/boardPostAction";
function BoardPostDetailPage() {
  const params = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoardPost(params.boardpostid));
  }, []);
  return (
    <div>
      <Header />
      <Body />
    </div>
  );
}

export default BoardPostDetailPage;
