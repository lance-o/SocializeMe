"use server";
import { db } from "@/lib/db";

// Query db for # of users following one user
export async function getCategories(followedUserId) {
    const category_response = await db.query(`select * from categories`);
    const categories = category_response.rows;
    return categories;
}




