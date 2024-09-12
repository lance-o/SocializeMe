import Post from "@/components/Post";
import UploadImage from "@/components/UploadImage";
import { db } from "@/lib/db";
import Image from "next/image";

export default async function Home() {
  const result = await db.query(`SELECT * FROM posts`);
  const posts = result.rows;
  return (
    <>
      {posts.map(function (post) {
        return <Post key={post.id} id={post.id} content={post.content}></Post>;
      })}
    </>
  );
}
