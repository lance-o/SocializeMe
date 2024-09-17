"use server";
import { db } from "@/lib/db";

// Query db for # of users a user is following
export async function getFollowingCount(followedUserId){
  const result = await db.query(`SELECT COUNT(*) FROM followers WHERE followed_by_id = $1; `,[followedUserId])
  return result.rows[0].count;
}

// Truncate number into a short, readable format. > 1 million denotes with M, > 1 thousand denotes with K.
export async function getFollowingCountTruncated(followedUserId){
    let count = await getFollowingCount(followedUserId);
    if(count>=1000000){
      count = parseFloat(count/1000000).toFixed(1) + "M";
    }
    else if(count>=1000){
      count = parseFloat(count/1000).toFixed(1)  + "K";
    }
    return count;
  }