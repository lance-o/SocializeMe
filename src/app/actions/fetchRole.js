"use server";
import { db } from "@/lib/db";

export async function fetchRole(Id) {
  const userRoleResponse = await db.query(
    `SELECT roles.role_name FROM roles JOIN
user_roles ON roles.id = user_roles.role_id
WHERE user_roles.user_id=$1`,
    [Id]
  );

  const userRole = userRoleResponse.rows[0];
  return userRole;
}


export async function fetchRoleNum(Id) {
  const userRoleResponse = await db.query(
    `SELECT roles.id FROM roles JOIN
user_roles ON roles.id = user_roles.role_id
WHERE user_roles.user_id=$1`,
    [Id]
  );

  const userRoleId = userRoleResponse.rows[0];
  if(userRoleId)
    return userRoleId.id;
  return 0;
}