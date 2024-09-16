"use server";
import { db } from "@/lib/db";

export async function fetchFollowings(followedBy) {
  // followedId is the id who the current user is following and the other one is the current user
  try {
    const followingRespons = await db.query(
      `SELECT users.id, users.email, users.first_name , users.profile_image from users join
followers ON users.id = followers.followed_user_id
WHERE followed_by_id = $1`,
      [followedBy]
    );
    const followings = followingRespons.rows;
    console.log("infunction");
    console.log(followings);
    return followings;
  } catch (error) {
    throw new Error("something happend in fetching followings");
  }
}
