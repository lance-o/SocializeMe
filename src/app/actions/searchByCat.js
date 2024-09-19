"use server";

import { db } from "@/lib/db";

export async function searchByCat(cat) {
  if(cat === "*")
    return null;
  const postsRes = await db.query("SELECT * FROM posts WHERE category_id=$1 ORDER BY posts.creation_date DESC", [
    cat,
  ]);

  const posts = postsRes.rows;
  return posts;
}
