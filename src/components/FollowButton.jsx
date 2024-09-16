"use client";

import { useFormStatus } from "react-dom";

export function FollowButton({ follow, existingFollow, numFollows }) {
  const { pending, data, method, action } = useFormStatus();
  return (
    <>
      {existingFollow 
      ? <button formAction={follow} className="flex justify-center border relative text-left rounded px-2 bg-green-300 hover:bg-red-400 before:content-['Unfollow'] hover:before:content-['Unfollow']">
        <p className="absolute right-4 top-0"></p>
      </button>

      : <button formAction={follow} className="flex justify-center border relative text-left rounded px-2 hover:bg-green-200">
        Follow
        <p className="absolute right-4 top-0"></p>
        </button>}

      
    </>
  );
}