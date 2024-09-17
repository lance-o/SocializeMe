import ProfileForm from "@/components/ProfileForm";

import { currentUser } from "@clerk/nextjs/server";

import { profileFormSubmit } from "../actions/profile";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import "./profile.css";
import { fetchUser } from "../actions/fetchUser";
import Link from "next/link";
import { fetchRole } from "../actions/fetchRole";

import AvatarDisplay from "@/components/Avatar";

import AlertDialogDemo from "@/components/AlertDialog";

import FollowingsAlertDialog from "@/components/FollowingsAlertDialog";
import { fetchFollowings } from "../actions/fetchFollowins";
import { fetchFollowers } from "../actions/fetchFollowers";
import FollowersAlertDialog from "@/components/FollowerAlertDialog";

import { getFollowerCountTruncated } from "@/app/actions/getFollowerCount";
import { getFollowingCountTruncated } from "@/app/actions/getFollowingCount";

import EditProfile from "@/components/EditProfile";

export default async function ProfilePage() {
  {
    const curUser = await currentUser();
    if (!curUser) {
      return (
        <>
          <p style={{ color: "red" }}>you need to Login first</p>
          <SignInButton />
          <SignOutButton />
        </>
      );
    }

    //checking if user has profile or not
    const theUser = await fetchUser(curUser?.id);

    if (!theUser) {
      // here if user is not available in users Table it return the form for filling it
      return (
        <div>
          <ProfileForm submission={profileFormSubmit} />
        </div>
      );
    }
    //feching role
    const role = await fetchRole(theUser?.id);
    //fetching followings
    const followingsList = await fetchFollowings(theUser?.id); // List of user who current user is following
    console.log(followingsList);
    //fetching followers
    const followersList = await fetchFollowers(theUser?.id);

    return (
      <div className="profilePage">
        <div>
          <div className="badgeAndInfo">
            <div className="info">
              <div>
                <AvatarDisplay src={`${theUser?.profile_image}`} />
              </div>

              <p>{`${theUser.first_name} ${theUser?.last_name}`}</p>
              <p>{`${theUser.email}`}</p>
              <p>Role: {`${role.role_name}`}</p>
            </div>
          </div>

          <div className="buttonOrder">
            <Link href="#">Badge role</Link>
            <EditProfile />
            <AlertDialogDemo id={theUser.id} /> {/* deleteAccount */}
            <SignOutButton />
          </div>
        </div>
        <div className="handlingButtons">
          <div className="followAndBtns">
            <div className="FollowBtn">
            <FollowingsAlertDialog
                followings={followingsList}
                followingCount={getFollowingCountTruncated(theUser?.id)}
                userId={theUser?.id}
                curRole={role.role_name}
                reviewRole={role.role_name}
                reviewId={theUser.id}
              />
              <FollowersAlertDialog
                followers={followersList}
                followersCount={getFollowerCountTruncated(theUser?.id)}
                userId={theUser?.id}
                curId={theUser.id}
                curRole={role.role_name}
                reviewRole={role.role_name}
                reviewId={theUser.id}
              />

              {/* <div>
                <Follow
                  userId={theUser.id}
                  followedUserId={theUser.id}
                ></Follow>
              </div> */}
            </div>
            <div className="buttonOrder">
              <Link href="/myposts">My Posts</Link>
              <Link href="users">Users</Link>
              <Link href="/favorites">Favorite</Link>
              <div className="badge">
                <p>badge Display</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
