"use client";
import React from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import "./ScrollAreaFollowings.css";

import AvatarDisplayTable from "./AvatarForTable";
import Link from "next/link";

import { FollowerControl } from "./FollowerControlMenu";
import { removeFromFollowers } from "@/app/actions/removeFromFollowers";

export default function ScrollAreaFollowers(props) {
  const canDeleteOrEdit =
    props.curRole === "manager" || // Manager can access all
    (props.curRole === "admin" && props.reviewRole === "normal_user") ||
    (props.curRole === "normal_user" && props.userId === props.reviewId) ||
    (props.curRole === "admin" && props.userId === props.reviewId);

  return (
    <ScrollArea.Root className="ScrollAreaRoot">
      <ScrollArea.Viewport className="ScrollAreaViewport">
        <div style={{ padding: "15px 20px" }}>
          <div className="Text">Followers: {props.followersCount}</div>

          <table>
            <thead>
              <tr className="trHead">
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {props.followers.map((follower) => (
                <tr className="trBody" key={follower.id}>
                  <td
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "0.75rem",
                    }}
                  >
                    <AvatarDisplayTable src={follower.profile_image} />
                    <Link
                      style={{ color: "purple" }}
                      href={`/profile/${follower.id}`}
                    >
                      {follower.first_name}
                    </Link>
                  </td>
                  <td>
                    <Link
                      style={{ color: "purple" }}
                      href={`/profile/${follower.id}`}
                    >
                      {follower.email}
                    </Link>
                  </td>
                  <td>
                    {canDeleteOrEdit && (
                      <>
                        {/* <button
                          onClick={() => {
                            props.unFollow(props.userId, follower.id);
                          }}
                        >
                          Remove
                        </button> */}

                        <FollowerControl
                          unFollow={props.unFollow}
                          userId={props.userId}
                          otherUser={follower.id}
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
