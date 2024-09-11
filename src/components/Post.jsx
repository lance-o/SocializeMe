"use client";
import Link from "next/link";

export default function Post(params) {
  return (
    <div className="postBody">
      <p>{params.content}</p>
    </div>
  );
}
