import Link from "next/link";
import Like from "./Like";

export default function Post(params) {
  return (
    <div className="postBody">
      <p>{params.content}</p>
      <Like postId={params.id} userId={20} />
    </div>
  );
}
