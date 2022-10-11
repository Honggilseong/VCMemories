import { useEffect, useState } from "react";
import Body from "../component/BoardPostDetailPage/Body";
import Header from "../component/CommonComponents/Forum/Main/Header";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../reducers/store";
import { getBoardPost } from "../actions/boardPostAction";
function BoardPostDetailPage() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [isBoardPostLoading, setIsBoardPostLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsBoardPostLoading(true);
    dispatch(getBoardPost(params.boardpostid));
    setIsBoardPostLoading(false);
  }, []);
  return (
    <div>
      <Header />
      <Body isBoardPostLoading={isBoardPostLoading} />
    </div>
  );
}

export default BoardPostDetailPage;
