"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { bebas_neue, inter } from "../fonts/fonts";
import { Card } from "../ui/components/ui/card";
import Link from "next/link";

const Page = () => {
  const [message, setMessage] = useState([]);
  const [error, setError] = useState(null);
    // Fetch special thanks from the backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages/`);
        if (!response.ok) {
          throw new Error("Failed to fetch membership plans.");
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
  const cdfMessage = message.filter((item) => {
  return item.message_from ==="Chief of Defense Forces"
  })
  const armyMessage = message.filter((item) => {
  return item.message_from ==="Commander Kenya Army"
  })
   const airMessage = message.filter((item) => {
  return item.message_from ==="Commander Kenya Airforce"
   })
   const navyMessage = message.filter((item) => {
  return item.message_from ==="Commander Kenya Navy"
   })
  const chairDFFAMessage = message.filter((item) => {
  return item.message_from ==="Chairman DFFA"
  })
  const chairUlinziMessage = message.filter((item) => {
  return item.message_from ==="Chairman Ulinzi FC"
  })
    return (
      <main className=" p-4">
        {
          cdfMessage.map((item) => (
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
        
      <h5 className="text-xl font-bold text-red-600">Services Commanders;</h5>
        <section className="grid grid-cols-3 gap-1 md:grid-cols-3">
           {
          armyMessage.map((item) => (
            <article className="rounded-md border-b-2 flex justify-around items-center p-2 mt-2 " key={item.id}>
              <Link href="/special-relay/commander-kenya-army">
                  <Card className=" flex flex-col items-center p-2">
                  <Image src={item.image }
                  alt={item.message_from}
                  height={100}
                  width={100}
                  className="rounded-lg object-contain "
                />
                  <p className={`${bebas_neue.className}  md:text-xl text-[#392d80]`}>{item.message_from}</p>
                </Card>
              </Link>
            </article>
          ))
          }
           {
          airMessage.map((item) => (
            <article className="rounded-md border-b-2 flex justify-around items-center p-2 mt-2 " key={item.id}>
              <Link href="/special-relay/commander-kenya-airforce">
                  <Card className=" flex flex-col items-center p-2">
                  <Image src={item.image }
                  alt={item.message_from}
                  height={100}
                  width={100}
                  className="rounded-lg object-contain "
                />
                  <p className={`${bebas_neue.className}  md:text-xl text-[#392d80]`}>{item.message_from}</p>
                </Card>
              </Link>
            </article>
          ))
          }
           {
          navyMessage.map((item) => (
            <article className="rounded-md border-b-2 flex justify-around items-center p-2 mt-2 " key={item.id}>
              <Link href="/special-relay/commander-kenya-navy">
                  <Card className=" flex flex-col items-center p-2">
                  <Image src={item.image }
                  alt={item.message_from}
                  height={100}
                  width={100}
                  className="rounded-lg object-contain "
                />
                  <p className={`${bebas_neue.className} md:text-xl text-[#392d80]`}>{item.message_from}</p>
                </Card>
              </Link>
            </article>
          ))
        }
        </section>
        <h5 className="text-xl font-bold text-red-600">Chair persons;</h5>
        <aside className="grid grid-cols-2">
          {
          chairDFFAMessage.map((item) => (
            <article className="rounded-md border-b-2 flex justify-around items-center p-2 mt-2 " key={item.id}>
              <Link href="/special-relay/chairman-DFFA">
                  <Card className=" flex flex-col items-center p-2">
                  <Image src={item.image }
                  alt={item.message_from}
                  height={50}
                  width={50}
                  className="rounded-lg object-contain "
                />
                  <p className={`${bebas_neue.className}  md:text-base text-[#392d80]`}>{item.message_from}</p>
                </Card>
              </Link>
            </article>
          ))
          }
          {
          chairUlinziMessage.map((item) => (
            <article className="rounded-md border-b-2 flex justify-around items-center p-2 mt-2 " key={item.id}>
              <Link href="/special-relay/chairman-ulinzi-FC">
                  <Card className=" flex flex-col items-center p-2">
                  <Image src={item.image }
                  alt={item.message_from}
                  height={50}
                  width={50}
                  className="rounded-lg object-contain "
                />
                  <p className={`${bebas_neue.className}  md:text-base text-[#392d80]`}>{item.message_from}</p>
                </Card>
              </Link>
            </article>
          ))
          }
        </aside>


      </main>
    )
}
export default Page;