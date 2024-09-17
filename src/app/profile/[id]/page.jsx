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
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
      revalidatePath(`/profile/${id}`);
      redirect(`/profile/${id}`);
    }

    async function handleUnfollow(formData) {
      "use server";

      await db.query(
        `DELETE FROM followers WHERE followed_by_id = $1 AND followed_user_id = $2`,
        [theUser.id, newUser.id]
      );
      revalidatePath(`/profile/${id}`);
      redirect(`/profile/${id}`);
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
            <Link href="#">Badge role</Link>
            {canDeleteOrEdit && (
              <>
                <EditProfile />
                <AlertDialogDemo id={newUser.id} /> {/* deleteAccount */}
              </>
            )}
          </div>
        </div>
        <div className="handlingButtons">
          <div className="followAndBtns">
            <div className="FollowBtn">
              <FollowingsAlertDialog
                followings={followingsList}
                userId={theUser?.id}
                curRole={curRole.role_name}
                reviewRole={role.role_name}
                reviewId={newUser.id}
              />
              <FollowersAlertDialog
                followers={followersList}
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
                <form action={isFollowed ? handleUnfollow : handleFollow}>
                  <button type="submit">
                    {isFollowed ? "Unfollow" : "Follow"}
                  </button>
                </form>
              </SignedIn>
              <div className="badge">
                <p>badge Display</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error.message);
    // throw new Error("Something in Dynamic profile routing is wrong");
  }
}
