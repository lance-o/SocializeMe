"use client";

import { useFormStatus } from "react-dom";

export function LikeButton({ like, existingLike, numLikes }) {
  const { pending, data, method, action } = useFormStatus();
  return (
    <>
      {existingLike 
      ? <button formAction={like} className="border relative text-left rounded px-2 bg-green-300 hover:bg-red-400 before:content-['Liked'] hover:before:content-['Unlike']">
        <p className="absolute right-4 top-0">{numLikes}</p>
      </button>

      : <button formAction={like} className="border relative text-left rounded px-2 hover:bg-green-200">
        Like
        <p className="absolute right-4 top-0">{numLikes}</p>
        </button>}

      
    </>
  );
}
