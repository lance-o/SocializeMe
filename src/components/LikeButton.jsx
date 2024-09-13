"use client";

import { useFormStatus } from "react-dom";

export function LikeButton({ like, existingLike }) {
  const { pending, data, method, action } = useFormStatus();
  return (
    <>
      {existingLike 
      ? <button formAction={like} className="border text-left rounded px-2 bg-green-300 hover:bg-red-400 before:content-['Liked'] hover:before:content-['Unlike']"></button>
      : <button formAction={like} className="border text-left rounded px-2 hover:bg-green-200">Like</button>}
    </>
  );
}
