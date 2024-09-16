"use client";
import React from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import "./ScrollAreaFollowings.css";
import AvatarDisplay from "./Avatar";
import AvatarDisplayTable from "./AvatarForTable";

export default function ScrollAreaFollowings(props) {
  const followings = props.followings;
  console.log("inScroll");
  console.log(followings);
  return (
    <ScrollArea.Root className="ScrollAreaRoot">
      <ScrollArea.Viewport className="ScrollAreaViewport">
        <div style={{ padding: "15px 20px" }}>
          <div className="Text">Followings</div>

          <table>
            <thead>
              <tr className="trHead">
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {followings.map((following) => (
                <tr className="trBody" key={following.id}>
                  <td>
                    <AvatarDisplayTable src={following.profile_picture_url} />
                    {following.first_name}
                  </td>
                  <td>{following.email}</td>
                  <td>
                    <button
                      onClick={() => {
                        props.unFollow(props.userId, following.id);
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="ScrollAreaScrollbar"
        orientation="vertical"
      >
        <ScrollArea.Thumb className="ScrollAreaThumb" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className="ScrollAreaScrollbar"
        orientation="horizontal"
      >
        <ScrollArea.Thumb className="ScrollAreaThumb" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="ScrollAreaCorner" />
    </ScrollArea.Root>
  );
}
