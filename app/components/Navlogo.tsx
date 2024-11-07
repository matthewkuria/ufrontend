import Image from "next/image";
import Link from "next/link"
import ulinzilogo from "../../public/images/ulinzi-logo.png"
export default function Navlogo() {
    return (
            <div className="">
               <Link href="/"> <Image src={ulinzilogo} alt="NCMI logo" width={100} height={100} className="w-20 h-16"/></Link>
            </div>
    )
}