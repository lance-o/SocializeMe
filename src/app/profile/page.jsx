import ProfileForm from "@/components/ProfileForm";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { profileFormSubmit } from "../actions/profile";

export default async function ProfilePage() {
  return (
    <div>
      <ProfileForm submission={profileFormSubmit} />
    </div>
  );
}
