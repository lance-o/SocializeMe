import React from "react";
import * as Avatar from "@radix-ui/react-avatar";
import "./Avatar.css";

export default function AvatarDisplay(props) {
  return (
    <div style={{ display: "flex", gap: 20 }}>
      <Avatar.Root className="AvatarRoot">
        <Avatar.Image
          className="AvatarImage"
          src={props.src}
          alt="User Avatar"
        />
        <Avatar.Fallback className="AvatarFallback" delayMs={600}>
          CT
        </Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}
