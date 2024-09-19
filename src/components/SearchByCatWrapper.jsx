"use client";

import { useState } from "react";
import SearchByCatComponent from "./SearchByCatComponent";

export default function SearchByCatWrapper(params) {
  const [posts, setPosts] = useState(null);

  return (
    <div>
      {/* Client-Side Media Upload */}
      <SearchByCatComponent doSearchByCatAction={params.doSearchByCatAction} categories={params.categories}/>
      {/* Hidden inputs for form submission */}
    </div>
  );
}
