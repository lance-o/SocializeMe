"use server";
import { db } from "@/lib/db";
import { removeFromFollowings } from "./removeFromFollowings";
import checkBlock from "./blockCheck";
import { checkFollow } from "./checkFollowing";

export async function blockUser(blockedUser, blokedBy) {
  try {
    const isBlocked = await checkBlock(blockedUser, blokedBy);
    if (isBlocked) {
      await db.query(
        `INSERT INTO blocked_users (blocked_user_id ,blocked_by_id ) VALUES($1,$2)`,
        [blockedUser, blokedBy]
      );
      await checkFollow(blokedBy, blockedUser);
      await removeFromFollowings(blokedBy, blockedUser);

      return true;
    } else {
      return (
        <>
          <p>User is Already Blocked</p>
        </>
      );
    }
  } catch (error) {
    throw new Error("Blocking did not happen");
  }
}
