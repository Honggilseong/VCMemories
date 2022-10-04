import { Comment } from "./../actions/boardPostDispatch";
export const getCountReplies = (comments: Comment[]) => {
  if (comments.length === 0) return 0;
  let counter: number = 0;
  comments.map((comment: any) => (counter = counter + comment.replies.length));
  return comments.length + counter;
};
