"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function unBlockUser(blockedBy, blockedUser) {
  try {
    await db.query(
      `DELETE FROM blocked_users WHERE blocked_user_id =$1 AND blocked_by_id=$2`,
      [blockedUser, blockedBy]
    );
    revalidatePath(`/profile/${blockedUser}`);
    redirect(`/profile/${blockedUser}`);
  } catch {
    throw new Error("unBlocked failed");
  }
}

export async function unBlockUserDropdown(blockedBy, blockedUser) {
  try {
    await db.query(
      `DELETE FROM blocked_users WHERE blocked_user_id =$1 AND blocked_by_id=$2`,
      [blockedUser, blockedBy]
    );
    revalidatePath(`/`);
  } catch {
    throw new Error("unBlocked failed");
  }
}
