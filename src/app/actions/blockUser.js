"use server";
import { db } from "@/lib/db";

import checkBlock from "./blockCheck";

import { checkFollower } from "./checkFollower";
import { checkFollowing } from "./checkFollowing";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function blockUser(blockedUser, blockedBy) {
  try {
    const isBlocked = await checkBlock(blockedUser, blockedBy);
    if (!isBlocked) {
      await db.query(
        `INSERT INTO blocked_users (blocked_user_id ,blocked_by_id ) VALUES($1,$2)`,
        [blockedUser, blockedBy]
      );
      const isFollow = await checkFollower(blockedBy, blockedUser);
      const isFollower = await checkFollowing(blockedBy, blockedUser);
      if (isFollow) {
        console.log("isFollow", isFollow);
        await db.query(
          `DELETE FROM followers
                   WHERE followed_user_id =$1 AND followed_by_id=$2`,
          [blockedBy, blockedUser]
        );
      }
      if (isFollower) {
        console.log("isFollower", isFollower);

        await db.query(
          `DELETE FROM followers
                   WHERE followed_user_id =$1 AND followed_by_id=$2`,
          [blockedUser, blockedBy]
        );
      }
      revalidatePath(`/profile`);
      redirect(`/profile`);
    } else {
      return (
        <>
          <p>User is Already Blocked</p>
        </>
      );
    }
  } catch (error) {
    //throw new Error("Blocking did not happen");
    console.log("erro is:");
    console.log(error.message);
  }
}

export async function blockUserDropdown(blockedUser, blockedBy) {
  try {
    const isBlocked = await checkBlock(blockedUser, blockedBy);
    if (!isBlocked) {
      await db.query(
        `INSERT INTO blocked_users (blocked_user_id ,blocked_by_id ) VALUES($1,$2)`,
        [blockedUser, blockedBy]
      );
      const isFollow = await checkFollower(blockedBy, blockedUser);
      const isFollower = await checkFollowing(blockedBy, blockedUser);
      if (isFollow) {
        console.log("isFollow", isFollow);
        await db.query(
          `DELETE FROM followers
                   WHERE followed_user_id =$1 AND followed_by_id=$2`,
          [blockedBy, blockedUser]
        );
      }
      if (isFollower) {
        console.log("isFollower", isFollower);

        await db.query(
          `DELETE FROM followers
                   WHERE followed_user_id =$1 AND followed_by_id=$2`,
          [blockedUser, blockedBy]
        );
      }
      console.log("what hapen");
      revalidatePath(`/`);
    } else {
      return (
        <>
          <p>User is Already Blocked</p>
        </>
      );
    }
  } catch (error) {
    //throw new Error("Blocking did not happen");
    console.log("erro is:");
    console.log(error.message);
  }
}
