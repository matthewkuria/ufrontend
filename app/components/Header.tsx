"use client";
import Socials from "./Socials";
import Navlinks from "./Navlinks";
import Navlogo from "./Navlogo";
import HamburgerMenu from "./HamburgerMenu";
import Registration from "./Registration";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

export default function Header() {
    const {isAuthenticated} = useAuth();
  
    return (
        <>
            <Socials />
            <nav className=" relative py-2 px-4 flex items-center justify-between shadow-md ">
               <Navlogo />
                <Navlinks />                 
                <HamburgerMenu />
                 <div className="hidden md:flex flex-col items-center">                    
                    {
                    isAuthenticated ? <Link href="/my-account" className="text-xs font-bold hover:text-red-600">My Account</Link> :<Registration />
                    }
                    
                </div>  
               
            </nav>
            <div className="h-1 bg-[#e93e22]"></div>
            <div className="h-1 bg-[#19a4dd]"></div>
            <div className="h-1 bg-[#392d80]"></div>
        </>
    )
}


