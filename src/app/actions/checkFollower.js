"use server";
import { db } from "@/lib/db";

export async function checkFollower(followedBy, followedId) {
  try {
    const followResponse = await db.query(
      `SELECT * FROM followers 
       WHERE followed_user_id = $1 AND followed_by_id = $2`,
      [followedBy, followedId]
    );

    const followExists = followResponse.rows.length > 0;

    console.log("Checking follow relationship between users:");
    console.log(followExists);

    return followExists;
  } catch (error) {
    throw new Error("Error while checking follow status");
  }
}
