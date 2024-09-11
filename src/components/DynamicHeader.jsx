import { SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import "./DynamicHeader.css";
export default function Header() {
  return (
    <div className="header">
      <div className="headerImage">
        <p>Image is here</p>
      </div>

      <div className="RightSideHeader">
        <p>username</p>

        <div className="righside_child">
          <Link href="/">Home</Link>

          <select defaultValue="">
            <option value="">Hidden Menu</option>
            <option value="/profile">Profile</option>
            <option value="">About us</option>
            <option value="">Job Board</option>
            <option value="">test2</option>
            <option value="">test3</option>
          </select>
        </div>
      </div>
    </div>
  );
}
