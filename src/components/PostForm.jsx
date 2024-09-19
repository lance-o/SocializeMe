import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import UploadMediaClientWrapper from "./UploadMediaClientWrapper"; // Client-side wrapper for UploadMediaTwo
import { redirect } from "next/navigation";
import "./PostForm.css";
import { SignInButton } from "@clerk/nextjs";
export default async function PostForm() {
  const curUser = await currentUser();
  if (!curUser) {
    return (
      <>
        <p style={{ color: "red" }}>
          you need to <SignInButton /> first
        </p>
      </>
    );
  }
  const category_response = await db.query(`select * from categories`);
  const categories = category_response.rows;

  async function addNewPost(formData) {
    "use server";

    // Get data from the form
    const content = formData.get("content");
    const imageUrl = formData.get("imageUrl"); // Will be set by client-side upload wrapprt-inside it it has 2 hidden input for this purpose
    const videoUrl = formData.get("videoUrl"); //like imageUrl
    const category = formData.get("category");
    const title = formData.get("title");

    // Get the clerk id of the currently signed-in user
    const currentuser = await currentUser();
    const userRecord = await db.query(
      `select id from users where clerk_user_id = $1`,
      [currentuser.id]
    );
    const userId = userRecord.rows[0].id;

    // Add the post to the database
    await db.query(
      `insert into posts(user_id, category_id, title, content, creation_date, content_image_url, content_video_url, like_count) values($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        userId,
        category, // Assuming you get the correct category_id in form
        title,
        content,
        new Date(),
        imageUrl, // Received from client-side upload
        videoUrl, // Received from client-side upload
        0,
      ]
    );

    // Redirect after the post is added
    redirect("/");
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
            {categories.map((category) => (
              <option
                style={{ color: "black" }}
                key={category.id}
                value={category.id}
              >
                {category.category_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          {/* Client-Side UploadMedia Component */}
          <UploadMediaClientWrapper />
        </div>
        <div>
          <button type="submit">Post</button>
        </div>
      </form>
    </div>
  );
}
