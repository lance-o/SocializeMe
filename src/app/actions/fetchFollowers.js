"use server";
import { db } from "@/lib/db";

export async function fetchFollowers(followedUser) {
  try {
    const followersRespons = await db.query(
      `SELECT users.id, users.email, users.first_name , users.profile_image from users join
followers ON users.id = followers.followed_by_id
WHERE followed_user_id = $1`,
      [followedUser]
    );
    const followers = followersRespons.rows;
    console.log("infunction Followers");
    console.log(followers);
    return followers;
  } catch (error) {
    throw new Error("something happend in fetching followers");
  }
}
