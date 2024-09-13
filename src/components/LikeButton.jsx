"use client";

import { useFormStatus } from "react-dom";

export function LikeButton({ like, existingLike }) {
  const { pending, data, method, action } = useFormStatus();
  return (
    <>
      <button formAction={like}>{existingLike ? "Unlike" : "Like"}</button>
    </>
  );
}
