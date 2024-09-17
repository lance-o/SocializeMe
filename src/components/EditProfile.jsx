"use client";

import "./EditProfile.css";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import UploadMedia from "./UploadImage";
import { useState } from "react";
import { EditProfileForm } from "@/app/actions/EditProfile";

export default function DialogDemo() {
  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    bio: "",
    imageUrl: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function Form({ EditProfileForm }) {
    const handleSubmit = async (event) => {
      // Prevent default form submission behavior
      event.preventDefault();
      // Create FormData
      const formData = new FormData(event.target);
      // Call the server action we passed in earlier, and pass in formData
      await EditProfileForm(formData);
    };
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="Button violet">Edit profile</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Test</Dialog.Title>
          <Dialog.Description className="">Edit Profile</Dialog.Description>
          <div>
            <form
              className="profileForm"
              onSubmit={async () => {
                await EditProfileForm();
              }}
            >
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="first_name">
                  First Name
                </label>
                <input
                  className="Input"
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

                <label className="Label" htmlFor="last_name">
                  Last Name
                </label>
                <input
                  className="Input"
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

                <label className="Label" htmlFor="email">
                  Email
                </label>
                <input
                  className="Input"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your Email"
                  title="Enter your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

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
                  <UploadMedia />
                  <input
                    type="hidden"
                    name="imageUrl"
                    id="imageUrl"
                    value={formData.imageUrl}
                  />
                </div>
              </fieldset>
            </form>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <Dialog.Close asChild>
              <button className="Button green">Save changes</button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
