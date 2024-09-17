import { fetchUser } from "@/app/actions/fetchUser";
import { savedPost } from "@/app/actions/savedPost";
import { currentUser } from "@clerk/nextjs/server";
import Post from "./Post";
import { SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import "./Favorite.css";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export default async function Favorite() {
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
    const theUser = await fetchUser(currUser?.id);
    const favoritePosts = await savedPost(theUser?.id);

    if (favoritePosts.length < 1) {
      return (
        <div className="fixedErrorMessage">
          <p>you have saved nothing try save some first</p>
          <div className="Links">
            <Link className="ankers" href="/">
              Home
            </Link>
            <Link className="ankers" href="/profile">
              Profile
            </Link>
          </div>
        </div>
      );
    }
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
  } catch {
    throw new Error("Displaying Post has some issue");
  }
}
