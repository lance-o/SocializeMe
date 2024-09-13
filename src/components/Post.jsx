import Link from "next/link";
import Like from "./LikeSave";

export default function Post(params) {
  return (
    <div className="postBody">
      <p>{params.content}</p>
      <Like postId={params.id} userId={5} />
    </div>
  );
}
