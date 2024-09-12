"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./UploadImage.css";

// Supabase initialization
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function UploadMedia() {
  const [media, setMedia] = useState(null); // For both images and videos
  const [mediaType, setMediaType] = useState(null); // To store media type (image/video)
  const [previewUrl, setPreviewUrl] = useState(null); // Preview for the uploaded media

  // Handle file change (both images and videos)
  const handleMediaChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type.split("/")[0]; // This will be 'image' or 'video'
      setMedia(file);
      setMediaType(fileType); // Store whether it's 'image' or 'video'
      setPreviewUrl(URL.createObjectURL(file)); // Create a preview URL for display
    }
  };

  // Upload image/video to Supabase storage
  const handleMediaUpload = async () => {
    const fileName = `${Date.now()}-${media.name}`; // Generate unique filename
    const { data, error } = await supabase.storage
      .from("images") // Use a generic "media" bucket for both images and videos
      .upload(fileName, media);
    if (error) {
      console.error("Upload error:", error);
      alert("Error uploading file: " + error.message);
      return;
    }

    // Get the public URL of the uploaded media
    const mediaUrl = `${supabaseUrl}/storage/v1/object/public/media/${data.path}`;
    console.log("Media uploaded:", mediaUrl);
    if (mediaType === "image") {
      document.getElementById("imageUrl").value = mediaUrl;
    } else {
      document.getElementById("videoUrl").value = mediaUrl;
    }
    // Update the hidden input with the media URL (for forms, if needed)
  };

  return (
    <div className="UploadDiv">
      {/* File Input */}
      <input
        id="Pro"
        type="file"
        onChange={handleMediaChange}
        accept="image/*,video/*"
      />
      <button type="button" onClick={handleMediaUpload}>
        Upload
      </button>

      {/* Preview the selected file */}
      {previewUrl && (
        <div>
          {mediaType === "image" ? (
            <img src={previewUrl} alt="Preview" width="300" />
          ) : (
            <video src={previewUrl} controls width="300" />
          )}
        </div>
      )}
    </div>
  );
}
