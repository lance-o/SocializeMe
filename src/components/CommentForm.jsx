import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import "./CommentForm.css";
import UploadMedia from "./UploadImage";
import { redirect } from "next/navigation";

export default async function CommentForm(params) {
  const category_response = await db.query(`select * from categories`);
  const categories = category_response.rows;

  async function addNewComment(formData) {
    "use server";

    //get data from form
    const content = formData.get("content");

    //get the clerk id of the currently signed in user
    const currentuser = await currentUser();
    const userRecord = await db.query(
      `select id from users where clerk_user_id = $1`,
      [currentuser.id]
    );
    const userId = userRecord.rows[0];
    console.log(userId);

    // add post to database
    await db.query(
      `insert into comments(post_id, user_id, content) values($1, $2, $3)`,
      [
        params.postId,
        userId?.id,
        content
      ]
    );
    redirect(`/post/${params.postId}`);
  }

  return (
    <div>
      <form className="postForm" action={addNewComment}>
        <div>
          <textarea
            autofocus
            name="content"
            rows="10"
            cols="80"
            placeholder="What would you like to comment?"
          ></textarea>
        </div>
        
        <div>
          <button>Comment</button>
        </div>
      </form>
    </div>
  );
}
