"use client";

import { useFormStatus } from "react-dom";

export function SaveButton({ save, existingSave }) {
  const { pending, data, method, action } = useFormStatus();
  return (
    <>
      {existingSave 
      ? <button formAction={save} className="border flex justify-center text-left rounded px-2 bg-red-300 hover:bg-sky-200 before:content-['Saved'] hover:before:content-['Unsave']"></button>
      : <button formAction={save} className="border flex justify-center  text-left rounded px-2 hover:bg-red-200">Save</button>}
    </>
  );
}