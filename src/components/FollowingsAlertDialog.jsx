"use client";
import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import "./FollowingsAlertDialog.css";
import ScrollAreaFollowings from "./ScrollArea";
import { removeFromFollowings } from "@/app/actions/removeFromFollowings";

export default function FollowingsAlertDialog(props) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="Button violet">Followings</button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="AlertDialogOverlay" />
        <AlertDialog.Content className="AAlertDialogContent">
          <ScrollAreaFollowings
            unFollow={removeFromFollowings}
            followings={props.followings}
            userId={props.userId}
          />
          <AlertDialog.Cancel asChild>
            <button className="Button mauve" style={{ margin: "2%" }}>
              Return
            </button>
          </AlertDialog.Cancel>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
