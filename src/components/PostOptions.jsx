"use client"

import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
    HamburgerMenuIcon,
    DotFilledIcon,
    CheckIcon,
    ChevronRightIcon,
  } from '@radix-ui/react-icons';

  import "./PostOptions.css";

export default function PostOptions(params){
    let isOwnPost = params.posterId == params.userId;
    let userFollows = params.isFollowed;
    let isModerator = false;

    function hi(){
        console.log(params.doFollowAction());
    }

    function editFunction(){
        console.log(params.doEditFunction());
    }

    function blockAction(){
        console.log(params.doBlockAction());
    }

    function followAction(){
        console.log(params.doFollowAction());
    }

    return(
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className="IconButton" aria-label="Customise options">
                <HamburgerMenuIcon />
                </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content className="DropdownMenuContent">
                {
                isOwnPost

                ?   <DropdownMenu.Item className="DropdownMenuItem" onSelect={editFunction}>
                        <div>Edit post -temporary-</div>
                    </DropdownMenu.Item>

                :   <DropdownMenu.Item className="DropdownMenuItem" onSelect={followAction}>
                        <div>Follow/Unfollow -temporary-</div>
                    </DropdownMenu.Item>
                }
                

                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}