import * as React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./PostOptions.css";
import "./EditPost.css";

export default function EditPost(params) {
  return (
    <div style={{ display: "flex", gap: 50 }}>
      <DropdownWithDialogItemsSolution1 postContent={params.postContent} doEditFunction={params.doEditFunction}/>
    </div>
  );
}

function DropdownWithDialogItemsSolution1(params) {
  return (
        <DropdownMenu.Group  className="DropdownMenuContent">
          <DialogItem triggerChildren="Edit">
            <Dialog.Title className="DialogTitle">Edit Post</Dialog.Title>
            <Dialog.Description className="DialogDescription">
              Edit this post below.
            </Dialog.Description>
            <fieldset className="Fieldset">
            <label className="Label" htmlFor="content">
              Post
            </label>
            <textarea
              className="content"
              name="post"
              id="content"
              placeholder="Edit your post"
              title="Edit your post"
            >
            {params.postContent}
            </textarea>
          </fieldset>
          <button className="Button green" onClick={()=>{params.doEditFunction("hi")}}>Save changes</button>
          </DialogItem>

          <DialogItem triggerChildren="Delete">
            <Dialog.Title className="DialogTitle">Delete</Dialog.Title>
            <Dialog.Description className="DialogDescription">
              Are you sure you want to delete this record?
            </Dialog.Description>
          </DialogItem>
        </DropdownMenu.Group>
  );
}

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
