import Post from "@/components/Post";
import { currentUser } from "@clerk/nextjs/server";
import { fetchUser } from "../../actions/fetchUser";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import CommentForm from "@/components/CommentForm";
import Comment from "@/components/Comment";

export default async function PostPage({ params }) {
  const id = params.id;
  const result = await db.query(` SELECT * FROM posts where posts.id = $1`, [
    id,
  ]);
  const post = result.rows[0];

  function isPostFound(exists) {
    let postFound = true;
    if (!exists) postFound = false;
    return postFound;
  }


  let resultComments;
  let comments;
  if(isPostFound(post!=null)){
    const resultComments = await db.query(`SELECT * FROM comments WHERE post_id = $1 ORDER BY id DESC`,[id,]);
    comments = resultComments.rows;
  }

  const currUser = await currentUser();
  const theUser = await fetchUser(currUser?.id);
  let userId = null;
  if (theUser != null) userId = theUser.id;

  return (
    <div>
      {isPostFound(post!=null) ?
        <div className="flex flex-col items-center">
          <div className="">
            <Post id={id} userId={userId}></Post>
          </div>
          <div className="">
            <CommentForm postId={id}></CommentForm>
            <div className="flex flex-col items-center py-2">
              {comments.map(function (comment) {
                return (
                  <Comment
                    key={comment.id}
                    id={comment.id}
                    userId={userId}
                  ></Comment>
                );
              })}
            </div>
          </div>
        </div>
        
       : 
        <p>This post does not exist, or has been deleted.</p>
      }
    </div>
  );
}
