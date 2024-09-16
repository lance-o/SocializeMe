"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function removeFromFollowings(followedBy, followedId) {
  await db.query(
    `DELETE FROM followers
             WHERE followed_user_id =$2 AND followed_by_id=$1`,
    [followedBy, followedId]
  );
  revalidatePath("/profile");
  redirect("/profile");
}
