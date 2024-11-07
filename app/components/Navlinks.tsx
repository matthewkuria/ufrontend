import Link from "next/link";

export default function Navlinks() {
    return (
        <ul className="md:flex justify-between font-bold text-blue-900  gap-5 hidden">
            <li className="hover:text-red-500 py-6 active"><Link href="/">Home</Link></li>
            <li className="hover:text-red-500 py-6 active"><Link href="/matches">Matches</Link></li>
            <li className="hover:text-red-500 py-6"><Link href="/news">News</Link></li>
            <li className="hover:text-red-500 py-6"><Link href="/tickets">Tickets</Link></li>
            <li className="hover:text-red-500 py-6"><Link href="/shop">Shop</Link></li>
            <li className="hover:text-red-500 py-6"><Link href="/about-ulinzi">Club</Link></li>
            <li className="hover:text-red-500 py-6"><Link href="/support">Donations</Link></li>
            <li className="hover:text-red-500 py-6"><Link href="/contact-us">Contact Us</Link></li>
        </ul>
    )
}