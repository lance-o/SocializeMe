import React, { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./PostOptions.css";
import "./EditPost.css";
import UploadMedia from "./UploadImage";
import UploadMediaClientWrapper from "./UploadMediaClientWrapper";

export default function EditPost(params) {
  return (
    <div style={{ display: "flex", gap: 50 }}>
      <DropdownWithDialogItemsSolution1
        postEntirety={params.postEntirety}
        doEditFunction={params.doEditFunction}
      />
    </div>
  );
}

function DropdownWithDialogItemsSolution1(params) {
  const [formData, setFormData] = useState({
    content: "",
    imageUrl: "",
    videoUrl: "",
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
    await params.doEditFunction(formData);
  };

  return (
    <DropdownMenu.Group className="DropdownMenuContent">
      <DialogItem triggerChildren="Edit">
        <Dialog.Title className="DialogTitle">Edit Post</Dialog.Title>
        <Dialog.Description className="DialogDescription">
          Edit this post below.
        </Dialog.Description>
        <form method="post" action="#" onSubmit={handleSubmit}>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="content"></label>
            <textarea
              className="content"
              name="postContent"
              id="content"
              placeholder="Edit your post"
              onChange={handleChange}
              title="Edit your post"
            >
              {params.postEntirety.content}
            </textarea>
            {/* <input
                type="hidden"
                name="imageUrl"
                id="imageUrl"
                value={params.postEntirety.content_image_url}
              />
              <input
                type="hidden"
                name="videoUrl"
                id="videoUrl"
                value={params.postEntirety.content_video_url}
              /> */}
            <UploadMediaClientWrapper />
          </fieldset>
          <button type="submit" className="Button green">
            Save changes
          </button>
        </form>
      </DialogItem>
    </DropdownMenu.Group>
  );
}

// eslint-disable-next-line react/display-name
const DialogItem = React.forwardRef((props, forwardedRef) => {
  const { triggerChildren, children, onSelect, onOpenChange, ...itemProps } =
    props;
  return (
    <Dialog.Root onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <DropdownMenu.Item
          {...itemProps}
          ref={forwardedRef}
          className="DropdownMenuItem"
          onSelect={(event) => {
            event.preventDefault();
            onSelect && onSelect();
          }}
        >
          {triggerChildren}
        </DropdownMenu.Item>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          {children}
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});
