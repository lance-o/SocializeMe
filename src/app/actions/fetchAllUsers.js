"use server";
import { db } from "@/lib/db";

export default async function fetchAllUsers() {
  const usersResponse =
    await db.query(`Select  users.* , user_roles.role_id ,roles.role_name from users  join user_roles
ON users.id = user_roles.user_id  Join roles ON user_roles.role_id = roles.id
`);
  const users = usersResponse.rows;
  return users;
}
