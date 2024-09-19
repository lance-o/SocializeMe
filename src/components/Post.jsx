import Link from "next/link";
import Like from "./LikeSave";
import { db } from "@/lib/db";
import Image from "next/image";
import AvatarDisplay from "./Avatar";
import "./Post.css";
import { userAgentFromString } from "next/server";
import DropdownMenuDemo from "./PostOptions";
import PostOptions from "./PostOptions";
import { removeFromFollowings } from "@/app/actions/removeFromFollowings";
import { followChecking } from "@/app/actions/followChecking";
import { editPost } from "@/app/actions/editPost";
import { deletePost } from "@/app/actions/deletePost";
import { handleFollow } from "@/app/actions/handleFollow";
import { redirect } from "next/navigation";
import blockCheck from "@/app/actions/blockCheck";
import { blockUser, blockUserDropdown } from "@/app/actions/blockUser";
import unBlockUser, { unBlockUserDropdown } from "@/app/actions/unBlockUser";
import { compareRole } from "@/app/actions/compareRole";

export default async function Post(params) {
  const id = params.id;
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
  
  async function doFollowAction(isOwnPost, isFollowing){
    "use server"
    handleFollow(params.userId, post.user_id, isOwnPost, isFollowing);
    redirect(`/`);
  }

  async function doBlockAction(userBlocked, userFollows){
    "use server"
    console.log("Hi from doblockaction", userBlocked);
    if(!userBlocked){
      blockUserDropdown(post.user_id, params.userId);
      console.log("Should have blocked them")
    }
    else{
      unBlockUserDropdown(params.userId, post.user_id);
      console.log("Should have unblocked them")
    }
    redirect("/");
  }

  async function doDeleteFunction(){
    "use server"
    await deletePost(id);
  }

  //Passed down to the dropdown and edit post component, to recieve updates to post.
  async function doEditFunction(formData){
    "use server"
    const content = formData.get("postContent");
    const imageUrl = formData.get("imageUrl");
    const videoUrl = formData.get("videoUrl");
    await editPost(id, content, imageUrl, videoUrl);
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
          postEntirety={post}
          isSuperior={await compareRole(params.userId,post.user_id)}
          isFollowed={await followChecking(params.userId, post.user_id)} 
          isBlocked={await blockCheck(post.user_id, params.userId)}
          doFollowAction={doFollowAction}
          doBlockAction={doBlockAction}
          doEditFunction={doEditFunction}
          doDeleteFunction={doDeleteFunction}>
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
