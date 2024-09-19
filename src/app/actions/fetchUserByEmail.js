"use server";
import { db } from "@/lib/db";

export async function fetchUserByEmail(email) {
  const userResponse = await db.query(`SELECT *FROM users WHERE email=$1`, [
    email,
  ]);

  const user = userResponse.rows[0];
  return user;
}
