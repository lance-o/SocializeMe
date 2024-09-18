"use server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function handleFollow(userId, followedUserId, isSelf, existingFollow){
    try{
        if (!userId){
            // Error message routine here
            throw new Error("Cannot save without being logged in");
          }
        
          if(isSelf){
            throw new Error("User cannot follow themselves");
          }
        
          if(existingFollow){
            await db.query(`DELETE FROM followers WHERE followed_by_id = $1 AND followed_user_id = $2`, [userId, followedUserId])
          }
          else{
            await db.query('INSERT INTO followers (followed_by_id, followed_user_id) VALUES ($1, $2)', [userId, followedUserId]);
          }
          revalidatePath(`/`);
    }
    catch (error){
        console.log("error: ", error.message);
    }
    
  }