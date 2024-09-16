import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { LikeButton } from "./LikeButton";
import { SaveButton } from "./SaveButton";
import { FollowButton } from "./FollowButton";
import Link from "next/link";
//import { revalidatePath } from "next/cache";

async function getExistingFollow(userId, followedUserId) {
  const result = await db.query(
    `SELECT * FROM followers WHERE followed_by_id = $1 AND followed_user_id =$2 LIMIT 1`,
    [userId, followedUserId]
  );
  const saved = result.rows;
  return saved?.[0] !== undefined;
}

async function handleFollow(userId, followedUserId, isSelf){
  if (!userId){
    // Error message routine here
    throw new Error("Cannot save without being logged in");
  }

  if(isSelf){
    throw new Error("User cannot follow themselves");
  }

  const existingFollow = await getExistingFollow(userId, followedUserId);

  if(existingFollow){
    await db.query(`DELETE FROM followers WHERE followed_by_id = $1 AND followed_user_id = $2`, [userId, followedUserId])
  }
  else{
    await db.query('INSERT INTO followers (followed_by_id, followed_user_id) VALUES ($1, $2)', [userId, followedUserId]);
  }

  revalidatePath("/");
}

async function getFollowerCount(followedUserId){
  const result = await db.query(`SELECT COUNT(*) FROM followers WHERE followed_user_id = $1; `,[followedUserId])
  let count = result.rows[0].count;
  if(count>=1000000){
    count = count/1000000 + "M";
  }
  else if(count>=1000){
    count = count/1000 + "K";
  }
  return count;
}

async function getFollowingCount(followedUserId){
  const result = await db.query(`SELECT COUNT(*) FROM followers WHERE followed_by_id = $1; `,[followedUserId])
  let count = result.rows[0].count;
  if(count>=1000000){
    count = count/1000000 + "M";
  }
  else if(count>=1000){
    count = count/1000 + "K";
  }
  return count;
}

export default async function Follow(params) {
  const existingFollow = await getExistingFollow(params.userId, params.followedUserId);
  let numFollows = await getFollowerCount(params.followedUserId);
  let numFollowing = await getFollowingCount(params.followedUserId);
  const isSelf = params.userId === params.followedUserId;


  async function follow(){
    "use server";
    await handleFollow(params.userId, params.followedUserId, isSelf);
  }

  return(
  <div className="flex flex-col">
    <div className="flex flex-row gap-10">
      <Link href="#">{"Followers: " + numFollows}</Link>
      <Link href="#">{"Following: " + numFollowing}</Link>
    </div>
    {(params.userId !== null && isSelf !== true)
    ? 
      <form className="flex flex-row w-[200px]">
        <FollowButton follow={follow} existingFollow={existingFollow} numFollows={numFollows}></FollowButton>
      </form>
    : null}
  </div>
  );
}
