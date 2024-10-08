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
import {
  getFollowerCount,
  getFollowerCountTruncated,
} from "@/app/actions/getFollowerCount";
import { getFollowingCountTruncated } from "@/app/actions/getFollowingCount";
import EditProfile from "@/components/EditProfile";
import Image3D from "@/components/Image3D";
export async function generateMetadata() {
  return {
    title: `Socialize Me App - Profile`,
    description: `Connecting Software Development Professionals Through Socialize Me!`,
  };
}
export default async function ProfilePage() {
  {
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

    //checking if user has profile or not
    const theUser = await fetchUser(curUser?.id);

    const creationDate = new Date(curUser.createdAt).toLocaleString();
    const lastLoginDate = new Date(curUser.lastSignInAt).toLocaleString();

    if (!theUser) {
      // here if user is not available in users Table it return the form for filling it
      return (
        <div>
          <ProfileForm
            submission={profileFormSubmit}
            userId={curUser?.id}
            creationDate={creationDate}
            lastLoginDate={lastLoginDate}
          />
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
    //badge managing
    let src = "";
    let badge = "";
    const followerCount = await getFollowerCount(theUser.id);
    {
      if (followerCount == 0) {
        badge = "";
      } else if (followerCount >= 1) {
        src = "/./assets/badge1.png";
      } else if (followerCount >= 50) {
        src = "/./assets/badge2.png";
      } else if (followerCount >= 1000) {
        src = "/./assets/badge3.png";
      }
    }
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
            <EditProfile userId={theUser.id} />
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
                {followerCount == 0 ? badge : <Image3D src={src} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
