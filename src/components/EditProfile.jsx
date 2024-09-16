"use client";

import "./EditProfile.css";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

export default function EditProfile() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="Button violet">Edit profile</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Edit profile</Dialog.Title>
          <Dialog.Description className="">Update</Dialog.Description>
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
              //   value={formData.email}
              //   onChange={handleChange}
              //   required
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
              // value={formData.firstname}
              // onChange={handleChange}
              required
            />
          </fieldset>

          <fieldset className="Fieldset">
            <label className="Label" htmlFor="Last Name">
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
              // value={formData.lastname}
              // onChange={handleChange}
              required
            />
          </fieldset>

          <fieldset className="Fieldset">
            <label className="Label" htmlFor="username">
              Username
            </label>
            <input className="Input" id="username" defaultValue="" />
          </fieldset>
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
