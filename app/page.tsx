"use client";
import Link from "next/link";
import Image from "next/image";
import clubLogo from "../public/images/ulinzi-logo.png"
import Registration from "./components/Registration";
import { useAuth } from "./context/AuthContext";
import { useEffect, useState } from "react";
export default function Home() {

const { isAuthenticated } = useAuth();
  const backgroundImages = [
  
    '/images/ulinzi-complex_1.jpg',
    
   
    
    
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
 const heroStyle = {
    backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  };
  return (
    <main className="text-center min-h-full">
      <section className="Her flex flex-col items-center justify-end md:grid md:grid-cols-1 h-[580px] md:h-[500px]"
      style={heroStyle}
      >
        <div className="  md:hidden lg:hidden flex absolute top-24 right-3">
          {
            isAuthenticated ? <Link href="/logout" className=" py-3 px-4 border-2 font-bold text-blue-900 hover:text-red-500">Logout</Link> :<Registration />
          }
        </div>
        
        <div className=" max-w-[350px] flex flex-col items-center justify-center bg-white rounded-lg p-1 text-xs ml-4 hover:drop-shadow-xl ">
          <div className="">
          <Image src={clubLogo} alt="The ulinzi stars club logo" width={100} height={100} className="animate-pulse" />
        </div>
          <h1 className=" text-xl text-red-600 md:text-2xl font-bold">
            Ulinzi Football Hub
          </h1>
          <p className="md:my-4">Stay updated with the latest news, matches, and exclusive content for fans.</p>
          <Link href="/signup" className="bg-blue-900 px-2 py-2 rounded-lg text-white hover:text-red-500">Join Now</Link>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center md:flex md:flex-row gap-6  mt-10 text-xs">
          <div className="feature">
            <p className="text-xl font-semibold">Shop</p>
            <p>Browse and purchase official club merchandise.</p>
            <Link href="/shop" className="hover:text-red-500">Shop Now</Link>
          </div>
          <div className="feature">
            <p className="text-xl font-semibold">Matches</p>
            <p>View match schedules, results, and standings.</p>
            <Link href="/matches" className="hover:text-red-500">See Matches</Link>
          </div>
          <div className="feature">
            <p className="text-xl font-semibold">Ulinzi Hub</p>
            <p>Read about our story.Get to know us better.</p>
            <Link href="/about-ulinzi" className="hover:text-red-500">About Us</Link>
          </div>
      </section>
      
    </main>
  );
}
