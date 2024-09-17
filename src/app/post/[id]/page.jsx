import Post from "@/components/Post";
import { currentUser } from "@clerk/nextjs/server";
import { fetchUser } from "../../actions/fetchUser";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export default async function PostPage({ params }) {
  const result = await db.query(` SELECT * FROM posts where posts.id = $1`, [
    params.id,
  ]);
  const post = result.rows[0];

  function isPostFound(exists) {
    let postFound = true;
    if (!exists) postFound = false;
    return postFound;
  }

  const currUser = await currentUser();
  const theUser = await fetchUser(currUser?.id);
  let userId = null;
  if (theUser != null) userId = theUser.id;
  const id = params.id;

  return (
    <div>
      {isPostFound(post!=null) ?
        <div className="flex justify-center translate-y-16 scale-125">
          <Post id={id} userId={userId}></Post>
        </div>
       : 
        <p>This post does not exist, or has been deleted.</p>
      }
    </div>
  );
}
