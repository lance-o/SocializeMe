"use server";
import { db } from "@/lib/db";
import { fetchRoleNum } from "./fetchRole";

export async function compareRole(userId,otherUserId) {
    console.log("is superior?: ", await fetchRoleNum(userId) > await fetchRoleNum(otherUserId))
    return await fetchRoleNum(userId) > await fetchRoleNum(otherUserId);
}
