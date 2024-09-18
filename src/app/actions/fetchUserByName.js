"use server";
import { db } from "@/lib/db";

export async function fetchUserByName(name) {
  const userResponse = await db.query(
    `SELECT *FROM users WHERE first_name=$1`,
    [name]
  );

  const user = userResponse.rows[0];
  return user;
}
