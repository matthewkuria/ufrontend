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
                <Link href="/my-account">My Account</Link>
                <HamburgerMenu />
                 <div className="hidden md:flex">                    
                    {
                    isAuthenticated ? <Link href="/logout" className="py-3 px-4 border-2 font-bold text-blue-900 hover:text-red-500">Logout</Link> :<Registration />
                     }
                </div>  
               
            </nav>
        </>
    )
}


