"use client";

import "./EditProfile.css";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

import editProfileSubmission from "@/app/actions/EditProfileForm";
import UploadMediaTwo from "./UploadImageTwo";

export default function EditProfile(props) {
  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    bio: "",
    imageUrl: "",
  });

  const [isUploading, setIsUploading] = useState(false); // Track upload status

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUploadComplete = (imageUrl) => {
    setFormData((prevData) => ({
      ...prevData,
      imageUrl: imageUrl,
    }));
    setIsUploading(false); // Upload is complete
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isUploading) {
      alert("Please wait for the image to finish uploading.");
      return;
    }
    const form = event.target;
    const formData = new FormData(form);
    await editProfileSubmission(formData);
    setFormData({
      email: "",
      firstname: "",
      lastname: "",
      bio: "",
      imageUrl: "",
    });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="Button violet">Edit profile</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Edit profile</Dialog.Title>
          <Dialog.Description>
            Update your profile information below.
          </Dialog.Description>
          <form method="post" action="#" onSubmit={handleSubmit}>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="email">
                Email
              </label>
              <input
                className="Input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="firstname">
                First Name
              </label>
              <input
                className="Input"
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="lastname">
                Last Name
              </label>
              <input
                className="Input"
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="bio">
                Bio
              </label>
              <input
                className="Input"
                type="text"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="Fieldset">
              <label htmlFor="imageUrl">Image</label>
              <UploadMediaTwo onUploadComplete={handleUploadComplete} />
              <input type="hidden" name="imageUrl" value={formData.imageUrl} />
              <input type="hidden" name="id" value={props.userId} />
            </fieldset>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="submit"
                className="Button green"
                disabled={isUploading}
              >
                Save
              </button>
            </div>
          </form>
          <Dialog.Close asChild>
            <button type="button" className="Button red">
              Close
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
