"use server";
import { db } from "@/lib/db";

export async function savedPost(userId) {
  const savedPostResponse = await db.query(
    `
SELECT posts.*
FROM posts
JOIN saved_posts ON posts.id = saved_posts.post_id
WHERE saved_posts.user_id =$1
`,
    [userId]
  );
  const savedPosts = savedPostResponse.rows;

  console.log(savedPosts);
  return savedPosts;
}
