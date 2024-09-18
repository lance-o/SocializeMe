import { useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import "./UploadImage.css";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function UploadMediaTwo({ onUploadComplete }) {
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const fileInputRef = useRef(null);

  const handleMediaUpload = async (selectedMedia) => {
    setLoading(true); // Set loading to true when upload starts
    setUploadMessage("Uploading...");
    const fileName = `${Date.now()}-${selectedMedia.name}`;

    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName, selectedMedia);

    if (error) {
      console.error("Upload error:", error);
      setUploadMessage("Upload failed");
      setLoading(false); // Set loading to false in case of error
      return;
    }

    const mediaUrl = `${supabaseUrl}/storage/v1/object/public/images/${data.path}`;
    setUploadMessage("Upload finished!");
    setLoading(false); // Set loading to false once upload is done
    onUploadComplete(mediaUrl); // Notify parent component
    setPreviewUrl(null);
    fileInputRef.current.value = null;
  };

  const handleMediaChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type.split("/")[0]; // 'image' or 'video'
      setMedia(file);
      setMediaType(fileType);
      setPreviewUrl(URL.createObjectURL(file));
      handleMediaUpload(file); // Automatically upload the file
    }
  };

  return (
    <div className="UploadDiv">
      {/* File Input */}
      <input
        type="file"
        onChange={handleMediaChange}
        accept="image/*,video/*"
        ref={fileInputRef}
      />

      {/* Display Spinner during upload */}
      {loading && <div className="spinner"></div>}

      {/* Display upload message */}
      {uploadMessage && <p>{uploadMessage}</p>}

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
