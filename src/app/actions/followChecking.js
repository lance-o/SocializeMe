import { db } from "@/lib/db";

export async function followChecking(currId, checkId) {
  const follow_user_response = await db.query(
    `SELECT EXISTS(SELECT FROM followers WHERE followed_by_id=$1 AND followed_user_id=$2) AS isFollowing`,
    [currId, checkId]
  );
  const isFollowed = follow_user_response.rows[0].isfollowing;
  return isFollowed;
}
