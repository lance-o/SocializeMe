import Link from "next/link";
import Like from "./LikeSave";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export default async function Post(params) {
  const session = await auth();
  //console.log(session.userId);
  const result = await db.query(
    `SELECT id FROM users where clerk_user_id = '${session.userId}'`
  );

  const userId = 1;
  // const userId = result.rows[0].id;
  return (
    <div className="postBody">
      <p>{params.content}</p>
      <Like postId={params.id} userId={userId} />
    </div>
  );
}
