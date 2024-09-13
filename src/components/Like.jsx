import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { LikeButton } from "./LikeButton";
//import { revalidatePath } from "next/cache";

async function getExistingLike(userId, postId) {
  const result = await db.query(
    `SELECT * FROM user_likes WHERE user_id = $1 AND post_id =$2 LIMIT 1`,
    [userId, postId]
  );
  const like = result.rows;
  return like?.[0] !== undefined;
}

async function handleLike(userId, postId){
  if (!userId){
    //throw new Error("Cannot vote without being logged in");
    // Error message routine here
    return;
  }

  const existingLike = await getExistingLike(userId,postId);

  if(existingLike){
    await db.query(`DELETE FROM user_likes WHERE user_id = $1 AND post_id = $2`, [userId, postId])
  }
  else{
    await db.query('INSERT INTO user_likes (user_id, post_id) VALUES ($1, $2)', [userId,postId]);
  }
  revalidatePath("/");
}

export default async function Like(params) {
  const existingLike = await getExistingLike(params.userId, params.postId);

  async function like(){
    "use server";
    await handleLike(params.userId, params.postId);
  }

  return(
  <>
    {params.userId !== null
    ? 
      <form>
        <LikeButton
          like={like}
          existingLike={existingLike}/>
      </form>
    : null}
  </>
  );
}
