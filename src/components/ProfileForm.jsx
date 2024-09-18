"use client";
import UploadMedia from "./UploadImage";
import "./ProfileForm.css";
import { useState } from "react";
import UploadMediaTwo from "./UploadImageTwo";

export default function ProfileForm({ submission }) {
  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    bio: "",
    imageUrl: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    await submission(form);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      email: "",
      firstname: "",
      lastname: "",
      bio: "",
      imageUrl: "",
    });
  };
  const handleUploadComplete = (imageUrl) => {
    setFormData((prevData) => ({
      ...prevData,
      imageUrl: imageUrl,
    }));
    setIsUploading(false); // Upload is complete
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form className="profileForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your Email"
            title="Enter your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            name="firstname"
            id="first_name"
            placeholder="First Name"
            title="Enter your name"
            minLength={3}
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            name="lastname"
            id="last_name"
            placeholder="Last Name"
            title="Enter your last name"
            minLength={5}
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="Bio">Bio</label>
          <input
            type="text"
            name="bio"
            id="Bio"
            placeholder="Bio"
            title="Choose a bio"
            value={formData.bio}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="imageUrl">Image</label>
          <UploadMediaTwo onUploadComplete={handleUploadComplete} />
          <input
            type="hidden"
            name="imageUrl"
            id="imageUrl"
            value={formData.imageUrl}
          />
        </div>
        <div>
          <button title="submit informations">Submit</button>
        </div>
      </form>
    </div>
  );
}
