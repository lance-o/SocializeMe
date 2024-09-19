"use client";

import { fetchUserByEmail } from "@/app/actions/fetchUserByEmail";
import { fetchUserByName } from "@/app/actions/fetchUserByName";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./SearchBarComponent.css";
import { searchByCat } from "@/app/actions/searchByCat";
export default function SearchByCatComponent() {
  const [searchMethod, setSearchMethod] = useState(""); // Holds selected search method (email or name)
  const [posts, setPosts] = useState(null);
  const router = useRouter();

  // Function to handle the search logic and call the correct function
  const searchHandle = async (event) => {
    event.preventDefault();

    const form = new FormData(event.target);
    //call action
    const posts = await searchByCat(form);
    setPosts(posts);

    setSearchMethod("");
  };
  const changleHandle = async (event) => {
    setSearchMethod(event.target.value);
  };
  return (
    <div className={"searchBarContainer"}>
      <form onSubmit={searchHandle}>
        <select
          onChange={changleHandle}
          id="category"
          name="category"
          defaultValue=""
        >
          <option disabled style={{ color: "black" }} value="">
            Choose a Category
          </option>
          {categories.map((category) => (
            <option
              style={{ color: "black" }}
              key={category.id}
              value={category.id}
            >
              {category.category_name}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}
