"use server";
import { db } from "@/lib/db";

// Query db for # of users following one user
export async function getFollowerCount(followedUserId) {
  const result = await db.query(
    `SELECT COUNT(*) FROM followers WHERE followed_user_id = $1; `,
    [followedUserId]
  );
  return result.rows[0].count;
}

export async function getFollowerCountTruncated(followedUserId) {
  let count = await getFollowerCount(followedUserId);
  console.log(count);
  if (count >= 1000000) {
    count = parseFloat(count / 1000000).toFixed(1) + "M";
  } else if (count >= 1000) {
    count = parseFloat(count / 1000).toFixed(1) + "K";
  }
  return count;
}
