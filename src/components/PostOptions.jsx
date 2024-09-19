"use client"

import React from 'react';
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Dialog from "@radix-ui/react-dialog";
import {
    HamburgerMenuIcon,
    DotFilledIcon,
    CheckIcon,
    ChevronRightIcon,
  } from '@radix-ui/react-icons';
  import "./PostOptions.css";
import EditProfile from './EditProfile';
import EditPost from './EditPost';
import DeletePost from './DeletePost';

export default function PostOptions(params){
    let isOwnPost = params.posterId == params.userId;
    let userFollows = params.isFollowed;
    let userBlocked = params.isBlocked;
    let isSuperior = params.isSuperior;

    
    console.log(userBlocked);

    function blockAction(){
        params.doBlockAction(userBlocked, userFollows);
    }

    function followAction(){
        params.doFollowAction(isOwnPost, userFollows);
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
                isSuperior
                ?<>
                    <EditPost postEntirety={params.postEntirety} doEditFunction={params.doEditFunction}></EditPost>
                    <DeletePost postEntirety={params.postEntirety} doDeleteFunction={params.doDeleteFunction}></DeletePost>
                    <DropdownMenu.Item className="DropdownMenuItem" onSelect={followAction}>
                        {userFollows 
                        ? <p>Unfollow</p>
                        : <p>Follow</p>}
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="DropdownMenuItem" onSelect={blockAction}>
                        {userBlocked 
                        ? <p>Unblock</p>
                        : <p>Block</p>}
                    </DropdownMenu.Item>
                </>
                :<>{
                
                    isOwnPost
    
                    ?   <div>
                            <EditPost postEntirety={params.postEntirety} doEditFunction={params.doEditFunction}></EditPost>
                            <DeletePost postEntirety={params.postEntirety} doDeleteFunction={params.doDeleteFunction}></DeletePost>
                        </div>
    
                    :   
                        <div>
                            <DropdownMenu.Item className="DropdownMenuItem" onSelect={followAction}>
                                {userFollows 
                                ? <p>Unfollow</p>
                                : <p>Follow</p>}
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className="DropdownMenuItem" onSelect={blockAction}>
                                {userBlocked 
                                ? <p>Unblock</p>
                                : <p>Block</p>}
                            </DropdownMenu.Item>
                        </div>
                    }
                    </>
                }
                

                

                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}
