"use client";
import React from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import "./ScrollAreaFollowings.css";

import AvatarDisplayTable from "./AvatarForTable";
import Link from "next/link";
import { FollowingControl } from "./FollowingControlMenu";

export default function ScrollAreaFollowings(props) {
  const followings = props.followings;
  console.log("inScroll");
  console.log(props.curRole);
  console.log(props.followings);
  const canDeleteOrEdit =
    props.curRole === "manager" || // Manager can access all
    (props.curRole === "admin" && props.reviewRole === "normal_user") ||
    (props.curRole === "normal_user" && props.userId === props.reviewId) ||
    (props.curRole === "admin" && props.userId === props.reviewId);
  console.log("userReview", props.reviewId);
  console.log("user", props.userId);
  return (
    <ScrollArea.Root className="ScrollAreaRoot">
      <ScrollArea.Viewport className="ScrollAreaViewport">
        <div style={{ padding: "15px 20px" }}>
          <div className="Text">Followings: {props.followingCount}</div>

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
                  <td
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "0.25rem",
                    }}
                  >
                    <AvatarDisplayTable src={following.profile_image} />
                    <Link
                      style={{ color: "purple" }}
                      href={`/profile/${following.id}`}
                    >
                      {" "}
                      {following.first_name}
                    </Link>
                  </td>
                  <td>
                    <Link
                      style={{ color: "purple" }}
                      href={`/profile/${following.id}`}
                    >
                      {following.email}
                    </Link>
                  </td>

                  <td>
                    {canDeleteOrEdit && (
                      <>
                        {/* <button
                          onClick={() => {
                            props.unFollow(props.userId, following.id);
                          }}
                        >
                          Remove
                        </button> */}
                        <FollowingControl
                          unFollow={props.unFollow}
                          userId={props.userId}
                          otherUser={following.id}
                        />
                      </>
                    )}
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
