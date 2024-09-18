"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deletePost(id) {
  console.log(id);
  await db.query(`DELETE FROM posts WHERE id = $1`, [id]);
  revalidatePath("/");
}
