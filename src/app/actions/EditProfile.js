"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const currentuser = await currentUser();
export async function EditProfileForm(formData) {
  "use server";
  const firstName = formData.get("firstname");
  const lastName = formData.get("lastname");
  const email = formData.get("email");
  const bio = formData.get("bio");
  const imageUrl = formData.get("imageUrl");
  //   const creationDate = new Date(currentuser.createdAt).toLocaleString();
  //   const lastLoginDate = new Date(currentuser.lastSignInAt).toLocaleString();

  await db.query(
    `UPDATE users SET email = $1, first_name = $2, last_name = $3, profile_image = $4, bio = $5
      `,

    [email, firstName, lastName, imageUrl, bio]
  );
  revalidatePath("/profile");
  redirect("/profile");
}
