import { PhoneIcon } from "@heroicons/react/24/solid";
import { SocialIcon } from "react-social-icons";

export default function Socials() {
    return (
        <div className="socials bg-blue-900 h-6 p-2 items-center justify-between text-white w-full hidden md:flex">
          <div className="flex gap-2">
            <PhoneIcon style={{height:20, width:20}} />
            <p className="">0720170602</p>
          </div>
          <div className="flex gap-3">
          <p className="">Follow Us</p>
            <SocialIcon url="https://facebook.com" href="https://facebook.com/ncmi-ke" style={{ height: 20, width: 20 }}/>
            <SocialIcon url="https://youtube.com" style={{ height: 20, width: 20 }}/>
            <SocialIcon url="https://twitter.com" style={{ height: 20, width: 20 }}/>
            <SocialIcon url="https://instagram.com" style={{ height: 20, width: 20 }}/>
          </div>          
        </div>
    )
}