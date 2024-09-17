import Link from "next/link";
import Like from "./LikeSave";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import Image from "next/image";
import AvatarDisplay from "./Avatar";
import "./Comment.css";
import { userAgentFromString } from "next/server";
import DropdownMenuDemo from "./PostOptions";
import PostOptions from "./PostOptions";
import { removeFromFollowers } from "@/app/actions/removeFromFollowers";
import { followChecking } from "@/app/actions/followChecking";

export default async function Comment(params) {
  const result = await db.query(
    `
    SELECT
      users.first_name as first_name,
      users.profile_image as profile_image_url,
      comments.content,
      comments.user_id
    FROM comments
    LEFT join users ON users.id = comments.user_id
    where comments.id = $1`,
    [params.id]
  );

  const comment = result.rows[0];

  let img_url =
    "https://qyjseqevsbahrjdnvkny.supabase.co/storage/v1/object/public/images/default.jpg?t=2024-09-16T13%3A13%3A17.184Z";
  if (comment.profile_image_url != null)
    img_url = comment.profile_image_url;
  
  const userName = comment.first_name ? comment.first_name : "Anonymous";
  return (
    <div className="commentBody">
      <div className="flex flex-row items-start gap-2">
        <AvatarDisplay src={img_url} css={"AvatarRootPost"} />
        <p>{userName}</p>
      </div>
      {
        // If content exists, display content & image/video. Else, display error.
        comment.content ? (
          <>
            <div className="commentContent">
              <p className="commentContentText">{comment.content}</p>
            </div>
          </>
        ) : (
          <h3 className="text-red-500">This comment has no content</h3>
        )
      }
    </div>
  );
}
