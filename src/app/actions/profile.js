import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function profileFormSubmit(formData,id,creationDate,lastLoginDate) {
  "use server";
  const firstName = formData.get("firstname");
  const lastName = formData.get("lastname");
  const email = formData.get("email");
  const bio = formData.get("bio");
  const imageUrl = formData.get("imageUrl");

  await db.query(
    `INSERT INTO users (clerk_user_id, email, first_name, last_name, profile_image, creation_date, password,bio, last_login_date, follower_count)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10);
    `,
    [
      id,
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
  const userResponse = await db.query(
    `SELECT *FROM users WHERE clerk_user_id=$1`,
    [id]
  );

  const user = userResponse.rows[0];
  await db.query(`INSERT INTO user_roles (user_id,role_id) VALUES($1,$2)`, [
    user.id,
    1,
  ]);

  revalidatePath("/profile");
  redirect("/profile");
}
