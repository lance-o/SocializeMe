import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import "./PostForm.css";
import UploadMedia from "./UploadImage";
import { revalidatePath } from "next/cache";

export default function PostForm() {
  return (
    <div>
      <form className="postForm" action={addNewPost}>
        <div>
          <textarea
            autofocus
            name="content"
            rows="10"
            cols="80"
            placeholder="What would you like to post?"
          ></textarea>
        </div>
        <div>
          <label htmlFor="imageUrl">Image/Video</label>
          <UploadMedia />
          <input type="hidden" name="imageUrl" id="imageUrl" />
        </div>
        <div>
          <button>Post</button>
        </div>
      </form>
    </div>
  );
}

async function addNewPost(formData) {
  "use server";

  //get data from form
  const content = formData.get("content");
  const imageUrl = formData.get("imageUrl");

  //get the clerk id of the currently signed in user
  const currentuser = await currentUser();
  const userRecord = await db.query(
    `select id from users where clerk_user_id = $1`,
    [currentuser.userId]
  );
  const userId = userRecord.rows[0];

  // add post to database
  //Note: user_id, category_id, title, like_count, videourl needs to be linked properly
  //How do we find title and category from the user?

  await db.query(
    `insert into posts(user_id, category_id, title, content, creation_date, content_image_url, content_video_url, like_count) values($1, $2, $3, $4, $5, $6, $7, $8)`,
    [20, 1, "", content, new Date(), imageUrl, "", 0]
  );
}
