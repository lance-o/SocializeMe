"use client";

import { fetchUserByEmail } from "@/app/actions/fetchUserByEmail";
import { fetchUserByName } from "@/app/actions/fetchUserByName";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./SearchByCatComponent.css";
import { searchByCat } from "@/app/actions/searchByCat";

export default function SearchByCatComponent(params) {
  const[disabled, setDisabled] = useState(true);
  const [searchMethod, setSearchMethod] = useState(""); // Holds selected search method (email or name)
  const [posts, setPosts] = useState(null);
  const router = useRouter();

  const categories = params.categories;

  // Function to handle the search logic and call the correct function
  const searchHandle = async (event) => {
    event.preventDefault();

    const form = new FormData(event.target);
    const category = form.get("category");

    params.doSearchByCatAction(category);
    setSearchMethod("");
  };
  const changleHandle = async (event) => {
    setSearchMethod(event.target.value);
    setDisabled(false);
  };
  return (
    <div className={"searchBarContainer"}>
      <form onSubmit={searchHandle}>
        <select
          className="searchByCatSelect"
          onChange={changleHandle}
          id="category"
          name="category"
          defaultValue=""
        >
          <option disabled style={{ color: "black" }} value="">
            Choose a Category
          </option>
          <option style={{ color: "black" }} value={"*"}>
            No Category
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
        <button className="butForFilter" disabled={disabled} type="submit">
          Sort Posts
        </button>
      </form>
    </div>
  );
}
