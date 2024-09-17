import Link from "next/link";
import Like from "./LikeSave";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import Image from "next/image";
import AvatarDisplay from "./Avatar";
import "./Post.css";
import { userAgentFromString } from "next/server";
import DropdownMenuDemo from "./PostOptions";
import PostOptions from "./PostOptions";
import { removeFromFollowers } from "@/app/actions/removeFromFollowers";
import { followChecking } from "@/app/actions/followChecking";

export default async function Post(params) {
  const result = await db.query(
    `
    SELECT
      users.first_name as first_name,
      users.profile_image as profile_image_url,
      posts.content,
      posts.content_image_url,
      posts.content_video_url,
      posts.user_id
    FROM posts
    LEFT join users ON users.id = posts.user_id
    where posts.id = $1`,
    [params.id]
  );
  const post = result.rows[0];
  
  async function doFollowAction(){
    "use server"
    console.log("Tried to follow/unfollow");
  }

  async function doBlockAction(){
    "use server"
    console.log("Tried to block/unblock");
  }

  async function doEditFunction(){
    "use server"
    console.log("Tried to edit post");
  }

  let img_url =
    "https://qyjseqevsbahrjdnvkny.supabase.co/storage/v1/object/public/images/default.jpg?t=2024-09-16T13%3A13%3A17.184Z";
  if (result.rows[0].profile_image_url != null)
    img_url = post.profile_image_url;
  const post_img = post.content_image_url;
  const post_vid = post.content_video_url;
  const userName = post.first_name
    ? post.first_name
    : "Anonymous";
  return (
    <div className="postBody">
      <div className="absolute right-2">
        <PostOptions 
          userId={params.userId} 
          posterId={post.user_id} 
          isFollowed={await followChecking(params.userId, post.user_id)} 
          doFollowAction={doFollowAction}
          doBlockAction={doBlockAction}
          doEditFunction={doEditFunction}>
        </PostOptions>
      </div>
      <div className="flex flex-row items-start gap-2">
        <AvatarDisplay src={img_url} css={"AvatarRootPost"} />
        <Link href={`/profile/${post.user_id}`}><p className="text-black">{userName}</p></Link>
      </div>
      {
        // If content exists, display content & image/video. Else, display error.
        post.content ? (
          <>
            <Link href={`/post/${params.id}` }>
              <div className="postContent">
                <p className="postContentText">{post.content}</p>
              </div>
            </Link>
            {
              // If video or image exists, conditionally render one.
              (post_vid != null && post_vid != "") ||
              (post_img != null && post_img != "") ? (
                <div className="postMediaContainer">
                  {
                    // If image exists and video does not, load image. Nothing is rendered otherwise.
                    post_img != null &&
                    post_img != "" &&
                    (post_vid == null || post_vid == "") ? (
                      <Image
                        src={post_img}
                        alt={post.content}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "auto" }}
                      ></Image>
                    ) : null
                  }

                  {
                    // If video exists and image does not, load video. Nothing is rendered otherwise.
                    post_vid != null &&
                    post_vid != "" &&
                    (post_img == null || post_img == "") ? (
                      <video src={post_vid} controls></video>
                    ) : null
                  }
                </div>
              ) : null
            }
          </>
        ) : (
          <h3 className="text-red-500">This post has no content</h3>
        )
      }
      <Like postId={params.id} userId={params.userId} />
    </div>
  );
}
