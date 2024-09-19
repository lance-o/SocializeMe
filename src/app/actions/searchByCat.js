"use server";

import { db } from "@/lib/db";

export async function searchByCat(cat) {
  if(cat === "*")
    return null;
  const catRes = await db.query(`SELECT *FROM categories WHERE id =$1`, [
    cat,
  ]);
  const categoryId = catRes.rows[0].id;
  const postsRes = await db.query("SELECT *FROM posts WHERE category_id=$1", [
    categoryId,
  ]);

  const posts = postsRes.rows;
  return posts;
}
