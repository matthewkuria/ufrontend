import Link from "next/link";
import { SocialIcon } from "react-social-icons";

export default function Footer() {
    return (
        <footer className="footer bg-blue-900 text-white text-base ">
            <div className="flex flex-col md:flex md:flex-row mx-auto md:justify-between p-6">
                <div className="contact flex flex-col w-full md:w-1/4">
                    <p className="footer-title">Our Club</p>
                    <Link href="/about-ulinzi">About Ulinzi Stars</Link>
                    <Link href="/contact-us">Contact Us</Link>
                    <Link href="/teams">Teams</Link>
                    <Link href="/matches">Matches</Link>
                </div>
                <div className="about-us flex flex-col w-full md:w-1/4">
                    <p className="footer-title">News</p>
                    <Link href="/news">Latest News</Link>
                    <Link href="#">Major Achievements</Link>
                    <Link href="#">Personal Stories</Link>
                    <Link href="/contact-us">Directions</Link>
                </div>
                <div className="ministries flex flex-col  w-full md:w-1/4">
                    <p className="footer-title">Shop & Tickets</p>
                    <Link href="/shop">Merchandise</Link>
                    <Link href="/tickets">Buy Tickets</Link>
                </div>
                <div className="support flex flex-col  w-full md:w-1/4">
                    <p className="footer-title">Supporters</p>                    
                    <Link href="/support">Donate</Link>
                    <p>Follow us(Social Media)</p>
                    <div className="flex gap-3">
                        <SocialIcon url="https://facebook.com" href="https://facebook.com" style={{ height: 20, width: 20 }}/>
                        <SocialIcon url="https://youtube.com" style={{ height: 20, width: 20 }}/>
                        <SocialIcon url="https://twitter.com" style={{ height: 20, width: 20 }}/>
                        <SocialIcon url="https://instagram.com" style={{ height: 20, width: 20 }}/>
                    </div>
                </div>                
            </div>
            <div className="copyright text-xs font-semibold flex justify-center bg-black py-2">
                <p className="tracking-wide">&copy; copyright-2024 || Ulinzi Hub || All rights reserved</p>
            </div>
        </footer>
    )
}