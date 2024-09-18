"use server";
import { db } from "@/lib/db";

export async function fetchUserById(id) {
  const userResponse = await db.query(`SELECT *FROM users WHERE id=$1`, [id]);

  const user = userResponse.rows[0];
  return user;
}
