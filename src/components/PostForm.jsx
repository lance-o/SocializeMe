import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import "./PostForm.css";
import UploadMedia from "./UploadImage";
import { revalidatePath } from "next/cache";

export default async function PostForm() {
  const category_response = await db.query(`select * from categories`);
  const categories = category_response.rows;

  async function addNewPost(formData) {
    "use server";

    //get data from form
    const content = formData.get("content");
    const imageUrl = formData.get("imageUrl");
    const videoUrl = formData.get("videoUrl");
    const category = formData.get("category");
    const category_response = await db.query(
      `select * from categories where category_name= $1`,
      [category]
    );
    const category_id = category_response.rows[0].id;
    const title = formData.get("title");

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
      `insert into posts(user_id, category_id, title, content, creation_date, content_image_url, content_video_url, like_count) values($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        userId?.id,
        category_id,
        title,
        content,
        new Date(),
        imageUrl,
        videoUrl,
        0,
      ]
    );
  }

  return (
    <div>
      <form className="postForm" action={addNewPost}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" name="title" placeholder="Title" />
        </div>
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
          <select id="category" name="category" defaultValue="">
            <option style={{ color: "black" }} value="">
              Select a category
            </option>
            {categories.map((category) => {
              return (
                <option style={{ color: "black" }} key={category.id}>
                  {category.category_name}
                </option>
              );
            })}
          </select>
          <label htmlFor="imageUrl">Image/Video</label>
          <UploadMedia />
          <input type="hidden" name="imageUrl" id="imageUrl" />
          <input type="hidden" name="videoUrl" id="videoUrl" />
        </div>
        <div>
          <button>Post</button>
        </div>
      </form>
    </div>
  );
}
