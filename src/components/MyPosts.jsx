import { SignInButton } from "@clerk/nextjs";
import Post from "./Post";
import { currentUser } from "@clerk/nextjs/server";
import { fetchUser } from "@/app/actions/fetchUser";
import { myPosts } from "@/app/actions/myPosts";

export default async function MyPosts() {
  try {
    const currUser = await currentUser();
    if (!currUser) {
      return (
        <>
          <p style={{ color: "red" }}>you need to Login first</p>
          <SignInButton />
        </>
      );
    }
    //fetching user
    const theUser = await fetchUser(currUser?.id);
    //fetching user's posts
    const userPosts = await myPosts(theUser?.id);

    return (
      <>
        {userPosts.map((post) => {
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
  } catch {
    throw new Error("something wrone in MyPosts Page");
  }
}
