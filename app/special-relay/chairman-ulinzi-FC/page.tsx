"use client";
import { useState, useEffect } from "react";
import { bebas_neue, inter } from "../../fonts/fonts";
import Image from "next/image";
const Page = () => {
  const [message, setMessage] = useState([]);
  const [error, setError] = useState(null);
    // Fetch special thanks from the backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages/`);
        if (!response.ok) {
          throw new Error("Failed to fetch Messages.");
        }
        const data = await response.json();
        setMessage(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching message relays :", error);
        setError("Failed to load messages.");
      }
    };

    fetchMessages();
  }, []);
    
const chairUlinziMessage = message.filter((item) => {
  return item.message_from ==="Chairman Ulinzi FC"
  })
    return (
        <main className="">
        {
          chairUlinziMessage.map((item) => (
            <article className="rounded-md border-b-2 flex flex-col items-center p-2 mt-2 " key={item.id}>
              <Image src={item.image }
                alt={item.message_from}
                height={300}
                width={300}
                className="rounded-lg object-contain "
              />
              <p className={`${bebas_neue.className} text-2xl text-[#392d80]`}>{item.message_from}</p>
            <pre className={`${inter.className} whitespace-pre-wrap text-gray-700`}><span className="text-xl text-red-500 font-bold">"</span>{ item.content} <span className="text-xl text-red-500 font-bold">"</span></pre>
            </article>
          ))
        }
        </main>
    )
}
export default Page;