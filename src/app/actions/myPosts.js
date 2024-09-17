"use server";
import { db } from "@/lib/db";

export async function myPosts(id) {
  const response = await db.query(`SELECT *FROM posts WHERE user_id = $1`, [
    id,
  ]);

  const userPosts = response.rows;

  return userPosts;
}
