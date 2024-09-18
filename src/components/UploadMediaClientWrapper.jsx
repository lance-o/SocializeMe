"use client"; // Mark this as a client-side component

import { useState } from "react";
import UploadMediaTwo from "./UploadImageTwo"; // Your existing upload component

export default function UploadMediaClientWrapper() {
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  return (
    <div>
      <label htmlFor="media">Upload Image/Video</label>

      {/* Client-Side Media Upload */}
      <UploadMediaTwo
        onUploadComplete={(url) => {
          if (url.match(/\.(jpeg|jpg|gif|png)$/)) {
            setImageUrl(url); // Set image URL if it's an image
            document.getElementById("imageUrl").value = url;
          } else {
            setVideoUrl(url); // Set video URL if it's a video
            document.getElementById("videoUrl").value = url;
          }
        }}
      />

      {/* Hidden inputs for form submission */}
      <input type="hidden" id="imageUrl" name="imageUrl" value={imageUrl} />
      <input type="hidden" id="videoUrl" name="videoUrl" value={videoUrl} />
    </div>
  );
}
