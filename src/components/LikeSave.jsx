import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { LikeButton } from "./LikeButton";
import { SaveButton } from "./SaveButton";
//import { revalidatePath } from "next/cache";

async function getExistingSave(userId, postId) {
  const result = await db.query(
    `SELECT * FROM saved_posts WHERE user_id = $1 AND post_id =$2 LIMIT 1`,
    [userId, postId]
  );
  const saved = result.rows;
  return saved?.[0] !== undefined;
}

async function getExistingLike(userId, postId) {
  const result = await db.query(
    `SELECT * FROM user_likes WHERE user_id = $1 AND post_id =$2 LIMIT 1`,
    [userId, postId]
  );
  const like = result.rows;
  return like?.[0] !== undefined;
}

async function handleSave(userId, postId){
  if (!userId){
    // Error message routine here
    throw new Error("Cannot save without being logged in");
  }

  const existingSave = await getExistingSave(userId,postId);

  if(existingSave){
    await db.query(`DELETE FROM saved_posts WHERE user_id = $1 AND post_id = $2`, [userId, postId])
  }
  else{
    await db.query('INSERT INTO saved_posts (user_id, post_id) VALUES ($1, $2)', [userId,postId]);
  }
  revalidatePath("/");
}

async function handleLike(userId, postId){
  if (!userId){
    // Error message routine here
    throw new Error("Cannot like without being logged in");
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

export default async function LikeSave(params) {
  const existingLike = await getExistingLike(params.userId, params.postId);
  const existingSave = await getExistingSave(params.userId, params.postId);


  async function like(){
    "use server";
    await handleLike(params.userId, params.postId);
  }

  async function save(){
    "use server";
    await handleSave(params.userId, params.postId);
  }

  return(
  <>
    {params.userId !== null
    ? 
      <form className="grid grid-cols-[200px,200px] grid-rows-1 gap-1">
        <LikeButton
          like={like}
          existingLike={existingLike}/>

        <SaveButton
          save={save}
          existingSave={existingSave}/>
      </form>
    : null}
  </>
  );
}
