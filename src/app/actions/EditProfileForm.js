"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export default async function editProfileSubmission(formData) {
  "use server";
  console.log("we are here in edit profile");
  console.log(formData);
  const Id = formData.get("id");
  console.log(Id);
  const id = parseInt(Id, 10);
  const userResponse = await db.query(`SELECT *FROM users WHERE id =$1`, [id]);

  const theUser = userResponse.rows[0];

  const firstName = formData.get("firstname") || theUser.first_name;
  const lastName = formData.get("lastname") || theUser.last_name;
  const email = formData.get("email") || theUser.email;
  const bio = formData.get("bio") || theUser.bio;
  const imageUrl = formData.get("imageUrl") || theUser.profile_image;
  await db.query(
    `UPDATE users
     SET 
         profile_image = $1,
         first_name = $2,
         last_name = $3,
         email = $4,
         bio = $5
     WHERE 
         id = $6;`,
    [imageUrl, firstName, lastName, email, bio, id]
  );

  revalidatePath(`/profile`);
  redirect(`/profile`);
}
