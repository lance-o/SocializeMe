"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export async function editPost(id, content, imageUrl, videoUrl) {
  "use server";
  await db.query(
    `UPDATE posts
     SET 
         content = $1,
         content_image_url = $2,
         content_video_url = $3
     WHERE 
         id = $4;`,
    [content, imageUrl, videoUrl, id]
  );

  revalidatePath(`/post/${id}`);
  redirect(`/post/${id}`);
}
