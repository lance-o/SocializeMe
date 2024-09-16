import ProfileForm from "@/components/ProfileForm";

import { currentUser } from "@clerk/nextjs/server";

import { profileFormSubmit } from "../actions/profile";
import { SignInButton } from "@clerk/nextjs";
import "./profile.css";
import { fetchUser } from "../actions/fetchUser";
import Link from "next/link";
import { fetchRole } from "../actions/fetchRole";
import AvatarDisplay from "@/components/Avatar";

import AlertDialogDemo from "@/components/AlertDialog";

export default async function ProfilePage({ params }) {
  const id = params.id;
  try {
    const curUser = await currentUser();
    if (!curUser) {
      return (
        <>
          <p>you need to Login first</p>
          <SignInButton />
        </>
      );
    }

    //checking if user has profile or not
    const theUser = await fetchUser(id);

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
            <Link href="#">edit profile</Link>

            <AlertDialogDemo id={theUser.id} />
          </div>
        </div>
        <div className="handlingButtons">
          <div className="followAndBtns">
            <div className="FollowBtn">
              <Link href="#">followings</Link>
              <Link href="#">followers</Link>
            </div>
            <div className="buttonOrder">
              <Link href="#">myposts</Link>
              <Link href="#">users</Link>
              <Link href="#">favourite</Link>
              <div className="badge">
                <p>badge Display</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch {
    throw new Error("Something in Dashboard is wrong");
  }
}
