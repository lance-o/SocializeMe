import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const currentuser = await currentUser();
export async function profileFormSubmit(formData) {
  "use server";
  const firstName = formData.get("firstname");
  const lastName = formData.get("lastname");
  const email = formData.get("email");
  const bio = formData.get("bio");
  const imageUrl = formData.get("imageUrl");
  const creationDate = new Date(currentuser.createdAt).toLocaleString();
  const lastLoginDate = new Date(currentuser.lastSignInAt).toLocaleString();

  await db.query(
    `INSERT INTO users (clerk_user_id, email, first_name, last_name, profile_image, creation_date, password,bio, last_login_date, follower_count)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10);
    `,
    [
      currentuser.id,
      email,
      firstName,
      lastName,
      imageUrl,
      creationDate,
      null,
      bio,
      lastLoginDate,
      0,
    ]
  );

  revalidatePath("/profile");
  redirect("/profile");
}
