"use client";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CalendarDateRangeIcon } from "@heroicons/react/24/solid";
import { LocateIcon } from "lucide-react";
import { useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export default function Announcements() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function fetchMembers() {
        const res = await fetch(`${apiUrl}/events/`);
        const data = await res.json();
        console.log(data)
        setEvents(data);
        }
        
        fetchMembers();
    }, []);
    return (
        <article className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {events.length == 0 ? 
                <p className="">No Upcoming events at the moment</p>
                :
                <>
                    {events.map(event => (
                        <Card key={event.id}>
                            {event.event_image &&
                                <div className="max-h-48 overflow-hidden rounded-lg">
                                    <Image src={event.event_image} alt="The event image" width={400} height={300} className="object-fill"/>
                                </div> 
                            }            
                            <CardHeader>
                                <p className="text-xl font-semibold text-yellow-700">{event.title}</p>
                            </CardHeader>
                            <CardContent className="max-h-40 overflow-y-scroll">
                                <p className="text-slate-600 text-[13px]">{event.description}</p>
                            </CardContent>
                            <CardFooter className="text-blue-900 font-semibold flex-col lg:flex lg:flex-row justify-around my-3">
                                <p className="flex gap-1">
                                    <CalendarDateRangeIcon width={20}/>
                                    {event.date}
                                </p>
                                <p className="flex gap-2">
                                    <LocateIcon width={20} />
                                    {event.venue}
                                </p>
                            </CardFooter>            
                        </Card>
                    ))}
                </>
            }
        </article>
    )
}