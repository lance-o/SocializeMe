import React, { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./PostOptions.css";
import "./DeletePost.css";
import UploadMedia from "./UploadImage";
import UploadMediaClientWrapper from "./UploadMediaClientWrapper";

export default function DeletePost(params) {
  return (
    <div style={{ display: "flex", gap: 50 }}>
      <DropdownWithDialogItemsSolution1 postEntirety={params.postEntirety} doDeleteFunction={params.doDeleteFunction}/>
    </div>
  );
}

function DropdownWithDialogItemsSolution1(params) {
    const [formData, setFormData] = useState({
        content: "",
        imageUrl:"",
        videoUrl:"",
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
        await params.doDeleteFunction();
      };

  return (
        <DropdownMenu.Group  className="DropdownMenuContent">
          <DialogItem triggerChildren="Delete Post">
            <Dialog.Title className="DialogTitle">Delete</Dialog.Title>
            <Dialog.Description className="DialogDescription">
              Are you sure you want to delete this post?
            </Dialog.Description>
                <form method="post" className="flex gap-4 justify-between" action="#" onSubmit={handleSubmit}>
                
                <button type="submit" className="Button red">Delete post</button>
                <Dialog.Close asChild>
                <button type="button" className="Button violet">
                Close
                </button>
                </Dialog.Close>
            </form>
          </DialogItem>
        </DropdownMenu.Group>
  );
}

// eslint-disable-next-line react/display-name
const DialogItem = React.forwardRef((props, forwardedRef) => {
    const { triggerChildren, children, onSelect, onOpenChange, ...itemProps } = props;
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