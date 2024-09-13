import { db } from "@/lib/db";

export async function fetchUser(clerkId) {
  const userResponse = await db.query(
    `SELECT *FROM users WHERE clerk_user_id=$1`,
    [clerkId]
  );

  const user = userResponse.rows[0];
  return user;
}
