"use client";

import { fetchUserByEmail } from "@/app/actions/fetchUserByEmail";
import { fetchUserByName } from "@/app/actions/fetchUserByName";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./SearchBarComponent.css";
export default function SearchBarComponent() {
  const [searchMethod, setSearchMethod] = useState(""); // Holds selected search method (email or name)
  const [searchInput, setSearchInput] = useState(""); // Holds user input
  const [error, setError] = useState(null); // Holds error message for validation
  const router = useRouter();

  // Function to handle the search logic and call the correct function
  const searchHandle = async (event) => {
    event.preventDefault();
    setError(null);

    if (!searchMethod) {
      setError("Please select a search method.");
      return;
    }

    if (!searchInput) {
      setError("Please enter the search input.");
      return;
    }

    try {
      let user;
      // Fetch user based on the selected method
      if (searchMethod === "email") {
        user = await fetchUserByEmail(searchInput);
      } else if (searchMethod === "name") {
        user = await fetchUserByName(searchInput);
      }

      if (user) {
        // If the user is found, redirect to the user profile
        router.push(`/profile/${user.id}`);
      } else {
        setError("User not found.");
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      setError("An error occurred while searching.");
    }
  };

  return (
    <div className={"searchBarContainer"}>
      <form onSubmit={searchHandle}>
        <label className={"searchLabel"}>Select your search method:</label>
        <div>
          <label className={"radioLabel"}>
            <input
              type="radio"
              className={"radioInput"}
              name="searchMethod"
              value="email"
              onChange={(event) => setSearchMethod(event.target.value)}
            />
            Search by Email
          </label>
          <label className={"radioLabel"}>
            <input
              type="radio"
              className={"radioInput"}
              name="searchMethod"
              value="name"
              onChange={(event) => setSearchMethod(event.target.value)}
            />
            Search by Name
          </label>
        </div>

        <input
          type="text"
          className={`searchInput ${searchMethod && "searchInputFocus"}`}
          placeholder={`Search User by ${searchMethod || "..."}`}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          disabled={!searchMethod} // ignore the error it is working
          className={`searchInput ${
            !searchMethod ? "searchInputDisabled" : ""
          }`}
        />

        <button type="submit" className="searchButton">
          Search
        </button>

        {error && <p className="errorMessage">{error}</p>}
      </form>
    </div>
  );
}
