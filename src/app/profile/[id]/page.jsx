import { fetchRole } from "@/app/actions/fetchRole";
import { fetchUser } from "@/app/actions/fetchUser";
import { fetchUserById } from "@/app/actions/fetchUserById";
import AlertDialogDemo from "@/components/AlertDialog";
import AvatarDisplay from "@/components/Avatar";
import ProfileForm from "@/components/ProfileForm";
import { SignInButton, SignedIn } from "@clerk/nextjs";

import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import "../profile.css";

import FollowingsAlertDialog from "@/components/FollowingsAlertDialog";
import FollowersAlertDialog from "@/components/FollowerAlertDialog";
import EditProfile from "@/components/EditProfile";
import { fetchFollowers } from "@/app/actions/fetchFollowers";
import { fetchFollowings } from "@/app/actions/fetchFollowins";
import { followChecking } from "@/app/actions/followChecking";
import {
  getFollowerCount,
  getFollowerCountTruncated,
} from "@/app/actions/getFollowerCount";
import { getFollowingCountTruncated } from "@/app/actions/getFollowingCount";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import checkBlock from "@/app/actions/blockCheck";
import unBlockUser from "@/app/actions/unBlockUser";
import checkMeBlocked from "@/app/actions/checkMeBlocked";
import Image3D from "@/components/Image3D";

export async function generateMetadata({ params }) {
  const id = parseInt(params.id, 10);
  const userRes = await db.query(`SELECT * FROM users WHERE id=$1`, [id]);
  const userName = userRes.rows[0];
  console.log("param is ", params);
  return {
    title: `Socialize Me App - ${userName.first_name}`,
    description: `Connecting Software Development Professionals Through Socialize Me!`,
  };
}

export default async function SingleProfilePage({ params }) {
  const id = params.id;
  const currUser = await currentUser();
  try {
    const curUser = await currentUser();
    if (!curUser) {
      return (
        <>
          <p style={{ color: "red" }}>you need to Login first</p>
          <SignInButton />
        </>
      );
    }

    //checking if current user has profile or not
    const theUser = await fetchUser(curUser.id);

    if (!theUser) {
      // here if user is not available in users Table it return the form for filling it
      return (
        <div>
          <ProfileForm submission={profileFormSubmit} />
        </div>
      );
    }
    //fetching newUser
    const newUser = await fetchUserById(id);
    console.log("fetching newuser");
    console.log(newUser);
    //feching role of new user
    const role = await fetchRole(id);
    console.log("here is role", role);
    //fetching role of current user
    const curRole = await fetchRole(theUser.id);
    //checking authorization for displaying edit & delete btn
    const canDeleteOrEdit =
      curRole.role_name === "manager" || // Manager can access all
      (curRole.role_name === "admin" && role.role_name === "normal_user") || // Admin can only manage Users
      (curRole.role_name === "admin" && theUser.id === newUser.id) ||
      (curRole.role_name === "normal_user" && theUser.id === newUser.id); // Users can only manage themselves

    console.log(canDeleteOrEdit);
    const followingsList = await fetchFollowings(newUser?.id); // List of user who current user is following
    console.log(followingsList);
    //fetching followers
    const followersList = await fetchFollowers(newUser?.id);

    // const follow_user_response = await db.query(
    //   `SELECT EXISTS(SELECT FROM followers WHERE followed_by_id=$1 AND followed_user_id=$2) AS isFollowing`,
    //   [user.id, userId]
    // );

    if (theUser.id == newUser.id) {
      return (
        <>
          <p style={{ color: "red", marginTop: "10px" }}>
            for cheking your page please select{" "}
            <Link
              style={{
                color: "blue",
                backgroundColor: "wheat",
                borderRadius: "5px",
                padding: ".24rem",
              }}
              href="/profile"
            >
              Profile
            </Link>
            .
          </p>
        </>
      );
    }
    const isFollowed = await followChecking(theUser.id, id);
    console.log(isFollowed);
    async function handleFollow(formData) {
      "use server";

      await db.query(
        `INSERT INTO followers (followed_by_id, followed_user_id) VALUES ($1, $2)`,
        [theUser.id, id]
      );
      await db.query(
        `UPDATE users SET follower_count= follower_count +1 WHERE id=$1`,
        [newUser.id]
      );
      revalidatePath(`/profile/${id}`);
      redirect(`/profile/${id}`);
    }

    async function handleUnfollow(formData) {
      "use server";

      await db.query(
        `DELETE FROM followers WHERE followed_by_id = $1 AND followed_user_id = $2`,
        [theUser.id, newUser.id]
      );
      await db.query(
        `
        UPDATE users 
        SET follower_count = CASE 
            WHEN follower_count - 1 < 0 THEN 0 
            ELSE follower_count - 1 
        END
      WHERE id =$1
    `,
        [newUser.id]
      );

      revalidatePath(`/profile/${id}`);
      redirect(`/profile/${id}`);
    }

    const isBlocked = await checkBlock(newUser.id, theUser.id);
    console.log("profiledynamic page block check", isBlocked);
    async function handleUnblock(formData) {
      "use server";
      await unBlockUser(theUser.id, newUser.id);
    }

    const amIblocked = await checkMeBlocked(newUser.id, theUser.id); //checking if the current user is blocked by others
    //badge managing
    //badge managing
    let src = "";
    let badge = "";
    const followerCount = await getFollowerCount(theUser.id);
    {
      if (followerCount == 0) {
        badge = "";
      } else if (followerCount == 1) {
        src = "/assets/badge1.png";
      } else if (followerCount == 50) {
        src = "/assets/badge2.png";
      } else if (followerCount == 1000) {
        src = "/assets/badge3.png";
      }
    }
    return (
      <div className="profilePage">
        <div>
          <div className="badgeAndInfo">
            <div className="info">
              <div>
                <AvatarDisplay src={`${newUser?.profile_image}`} />
              </div>

              <p>{`${newUser.first_name} ${newUser?.last_name}`}</p>
              <p>{`${newUser.email}`}</p>
              <p>Role: {`${role?.role_name}`}</p>
            </div>
          </div>

          <div className="buttonOrder">
            {canDeleteOrEdit && (
              <>
                <EditProfile />
                <AlertDialogDemo id={newUser.id} /> {/* deleteAccount */}
              </>
            )}
          </div>
        </div>
        <div className="handlingButtons">
          {!isBlocked && (
            <div className="followAndBtns">
              <div className="FollowBtn">
                <FollowingsAlertDialog
                  followings={followingsList}
                  followingCount={getFollowingCountTruncated(id)}
                  userId={theUser?.id}
                  curRole={curRole.role_name}
                  reviewRole={role.role_name}
                  reviewId={newUser.id}
                />
                <FollowersAlertDialog
                  followers={followersList}
                  followersCount={getFollowerCountTruncated(id)}
                  userId={newUser?.id}
                  curId={theUser.id}
                  curRole={curRole.role_name}
                  reviewRole={role.role_name}
                />

                {/* <div>
                <Follow
                  userId={theUser.id}
                  followedUserId={theUser.id}
                ></Follow>
              </div> */}
              </div>
              <div className="buttonOrder">
                <SignedIn>
                  {!amIblocked && (
                    <form action={isFollowed ? handleUnfollow : handleFollow}>
                      <button type="submit">
                        {isFollowed ? "Unfollow" : "Follow"}
                      </button>
                    </form>
                  )}
                </SignedIn>
                <div className="badge">
                  {followerCount == 0 ? badge : <Image3D src={src} />}
                </div>
              </div>
            </div>
          )}
        </div>
        <>
          {isBlocked && (
            <form action={handleUnblock}>
              <button>unblock</button>
            </form>
          )}
        </>
      </div>
    );
  } catch (error) {
    console.log(error.message);
    // throw new Error("Something in Dynamic profile routing is wrong");
  }
}
