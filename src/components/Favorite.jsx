import { fetchUser } from "@/app/actions/fetchUser";
import { savedPost } from "@/app/actions/savedPost";
import { currentUser } from "@clerk/nextjs/server";
import Post from "./Post";

export default async function Favorite() {
  const currUser = await currentUser();
  const theUser = await fetchUser(currUser?.id);
  const favoritePosts = await savedPost(theUser?.id);
  return (
    <>
      {favoritePosts.map((post) => {
        return (
          <Post
            key={post.id}
            id={post.id}
            content={post.content}
            userId={theUser.id}
          ></Post>
        );
      })}
    </>
  );
}
