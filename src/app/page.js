import Post from "@/components/Post";
import UploadImage from "@/components/UploadImage";
import { db } from "@/lib/db";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { fetchUser } from "./actions/fetchUser";

export default async function Home() {
  const currUser = await currentUser();
  const theUser = await fetchUser(currUser?.id);
  let userId = null;
  if (theUser != null) userId = theUser.id;
  const result = await db.query(`SELECT * FROM posts`);
  const posts = result.rows;
  return (
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
  );
}
