"use client";
import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import "./FollowControlMenu.css";
import TrashSVG from "./TrashSVG";
import BlockSVG from "./BlockSVG";
import { blockUser } from "@/app/actions/blockUser";

export function FollowControl(props) {
  const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
  const [urlsChecked, setUrlsChecked] = React.useState(false);
  const [person, setPerson] = React.useState("pedro");

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="IconButtonn" aria-label="Customise options">
          <HamburgerMenuIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContentt" sideOffset={5}>
          <DropdownMenu.Item className="DropdownMenuItems">
            <button
              onClick={() => {
                props.unFollow(props.userId, props.otherUser);
              }}
            >
              Remove
            </button>
            <div className="RightSlot">
              <TrashSVG />
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="DropdownMenuSeparatorr" />
          <DropdownMenu.Item className="DropdownMenuItems">
            <button
              onClick={async () => {
                await blockUser(props.otherUser, props.userId);
              }}
            >
              {" "}
              Block
            </button>
            <div className="RightSlot">
              <BlockSVG />
            </div>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="DropdownMenuSeparatorr" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
