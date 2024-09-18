"use client";

import "./EditProfile.css";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import UploadMedia from "./UploadImage";
import editProfileSubmission from "@/app/actions/EditProfileForm";

export default function EditProfile(props) {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    await editProfileSubmission(formData);
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
          <Dialog.Description className="">
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
                id="email"
                placeholder="Enter your Email"
                title="Enter your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </fieldset>
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
            </fieldset>
            <fieldset className="Fieldset">
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
            </fieldset>
            <fieldset className="Fieldset">
              <label className="Label" htmlFor="bio">
                Bio
              </label>
              <input
                className="Input"
                type="text"
                name="bio"
                id="bio"
                placeholder="Enter your bio"
                title="Enter your bio"
                value={formData.bio}
                onChange={handleChange}
                required
              />
            </fieldset>
            <fieldset className="Fieldset">
              <label htmlFor="imageUrl">Image</label>
              <UploadMedia />
              <input
                type="hidden"
                name="imageUrl"
                id="imageUrl"
                value={formData.imageUrl}
              />
              <input type="hidden" name="id" id="id" value={props.userId} />
            </fieldset>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button type="submit" className="Button green">
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
