"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import "./DynamicHeader.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter(); // Use the useRouter hook to perform redirections
  const [selectedValue, setSelectedValue] = useState("");
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue) {
      router.push(selectedValue); // Redirect to the selected path
    }
    setSelectedValue("");
  };
  return (
    <div className="header">
      <div>
        <Image
          className="headerImage"
          src={"/assets/socializeMe.png"}
          width={100}
          height={100}
          alt="logo"
        ></Image>
      </div>
      <div
        className="headerOverlay"
        style={{
          position: "absolute",
          left: "0px",
          top: "0px",
          width: "100vw",
          height: "120px",
        }}
      >
        <Image
          layout="fill"
          objectFit="cover"
          className="absolute left-0 top-0"
          src={"/assets/banner.webp"}
          width={0}
          height={0}
          sizes="100vw"
          alt="banner"
        />
        {}
      </div>

      <div className="RightSideHeader">
        <div className="ClerkUserArea">
          <p>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </p>
        </div>

        <div className="rightside_child">
          <div className="NavItems">
            <SignedIn>
              <SignOutButton />
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <Link href="/">Home</Link>

            <Link href="/profile" className="NavItem1Hide">
              Profile
            </Link>
            <Link href="/post" className="NavItem2Hide">
              Make Post
            </Link>
            <Link href="/favorites" className="NavItem3Hide">
              Favorites
            </Link>
            <Link href="/users" className="NavItem4Hide">
              Users
            </Link>
          </div>

          <select
            className="headerSelect"
            onChange={handleSelectChange}
            value={selectedValue}
            defaultValue=""
          >
            <option disabled value="">
              Hidden Menu
            </option>
            <option value="/profile" className="SelectItem1Hide">
              Profile
            </option>
            <option value="/post" className="SelectItem2Hide">
              Make Post
            </option>
            <option value="/favorites" className="SelectItem3Hide">
              Favorites
            </option>
            <option value="/users" className="SelectItem4Hide">
              Users
            </option>
            <option value="/myposts">myposts</option>
          </select>
        </div>
      </div>
    </div>
  );
}
