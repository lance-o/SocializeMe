import ProfileForm from "@/components/ProfileForm";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { profileFormSubmit } from "../actions/profile";
import { SignInButton } from "@clerk/nextjs";
import "./profile.css";
import { fetchUser } from "../actions/fetchUser";
import Link from "next/link";
import { fetchRole } from "../actions/fetchRole";
import Follow from "@/components/Follow";

export default async function ProfilePage() {
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

    return (
      <div className="profilePage">
        <div className="badgeAndInfo">
          <div className="info">
            <div>
              <Image
                src={`${theUser?.profile_image}`}
                width={200}
                height={200}
                style={{ objectFit: "cover" }}
                alt="profile"
              />
            </div>

            <p>{`${theUser.first_name} ${theUser?.last_name}`}</p>
            <p>{`${theUser.email}`}</p>
            <p>Role: {`${role.role_name}`}</p>
            <Link href="#">myposts</Link>
          </div>
        </div>
        <div className="badge">
          <p>badge</p>
        </div>
        <div>
          <Follow userId={theUser.id} followedUserId={theUser.id}></Follow>
        </div>
        {/* <div>
          <Link href="#">followings</Link>
          <Link href="#">followers</Link>
        </div> */}
        <div className="buttonOrder">
          <Link href="#">users</Link>
          <Link href="#">favourite</Link>
          <Link href="#">edit profi</Link>
          <Link href="#">deleteAccount</Link>
        </div>
      </div>
    );
  } catch {
    throw new Error("Something in Dashboard is wrong");
  }
}
