import { SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import "./DynamicHeader.css";
import SearchBarComponent from "./SearchBarComponent";
export default function Header() {
  return (
    <div className="header">

      <div >
        <Image className="headerImage" src={"/assets/socializeMe.png"} width={100} height={100} alt="logo"></Image>
      </div>


      <div className="headerOverlay" style={{
              position: 'absolute',
              left:'0px',
              top:'0px',
              width: '100vw',
              height: '120px',
            }}>

        <Image layout="fill" objectFit="cover" className="absolute left-0 top-0" src={"/assets/banner.webp"} width={0} height={0} sizes="100vw" alt="banner"
        />
      </div>

      

      <div className="RightSideHeader">
        <div className="ClerkUserArea">
          <p>username</p>
        </div>

        <div className="righside_child">
          <Link href="/">Home</Link>

          <div className="NavItems">
            <p className="NavItem1Hide">Item 1</p>
            <p className="NavItem2Hide">Item 2</p>
            <p className="NavItem3Hide">Item 3</p>
            <p className="NavItem4Hide">Item 4</p>
          </div>

          

          <select defaultValue="">
            <option value="" className="SelectItem1Hide">Hidden Menu</option>
            <option value="/profile" className="SelectItem2Hide">Profile</option>
            <option value="" className="SelectItem3Hide">About us</option>
            <option value=""  className="SelectItem4Hide">Job Board</option>
            <option value="">test2</option>
            <option value="">test3</option>
          </select>
          
          
          <SearchBarComponent></SearchBarComponent>
        </div>
      </div>
    </div>
  );
}
