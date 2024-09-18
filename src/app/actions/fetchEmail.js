"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export default async function fetchEmail() {
  const currUser = await currentUser();

  if (currUser) {
    const userRes = await db.query(
      `SELECT *FROM users WHERE clerk_user_id=$1`,
      [currUser.id]
    );
    const email = userRes.rows[0].email;
    return email;
  } else {
    return "Guest";
  }
}
