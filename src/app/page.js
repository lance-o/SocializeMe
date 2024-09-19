import Post from "@/components/Post";
import UploadImage from "@/components/UploadImage";
import { db } from "@/lib/db";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { fetchUser } from "./actions/fetchUser";
import { getCategories } from "./actions/getCategories";
import { searchByCat } from "./actions/searchByCat";
import SearchByCatWrapper from "@/components/SearchByCatWrapper";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

let fliteredPosts = null;
export default async function Home() {
  const currUser = await currentUser();
  const theUser = await fetchUser(currUser?.id);
  let userId = null;
  if (theUser != null) userId = theUser.id;
  const result = await db.query(`SELECT * FROM posts ORDER BY posts.creation_date DESC`);
  let posts = result.rows;

  async function doSearchByCatAction(cat){
    "use server"
    console.log("category: ", cat);
    fliteredPosts = await searchByCat(cat);
    console.log("filtered posts: ", posts);
    revalidatePath("/");
    redirect("/");
  }

  

  return (
    <>
    <SearchByCatWrapper doSearchByCatAction={doSearchByCatAction} categories={await getCategories()}/>
    {
    fliteredPosts
    ?
    <>
    {fliteredPosts.map(function (post) {
      return (
        <Post
          key={post.id}
          id={post.id}
          userId={userId}
        ></Post>
      );
    })}
    </>
    :
    <>
    {posts.map(function (post) {
      return (
        <Post
          key={post.id}
          id={post.id}
          userId={userId}
        ></Post>
      );
    })}
    </>
    }
    </>
  );
}
