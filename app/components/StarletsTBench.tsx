"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import { Card, CardContent, CardHeader } from "../ui/components/ui/card";
import { bebas_neue, inter } from "../fonts/fonts";

export default function Players() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   // State to hold filter values 
  const [filters, setFilters] = useState({
    team: "starlets", // Default filter for team
   
  });

     useEffect(() => {
    const fetchBench = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/technical-bench/`); // Adjust to your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch the technical bench');
        }
        const data = await response.json();
        // Sort by custom roles
        const sortedData = data.sort((a, b) => {
          const roleOrder = [
            "Head Coach",
            "Assistant Head Coach",
            "Departmental Coach",
            "GK Coach",
            "GK Trainer",
            "Trainer",

          ];
            const indexA = roleOrder.indexOf(a.role) === -1 ? 999 : roleOrder.indexOf(a.role);
            const indexB = roleOrder.indexOf(b.role) === -1 ? 999 : roleOrder.indexOf(b.role);
            return indexA - indexB;
        });
        setMembers(sortedData);
        console.log(data)
      } catch (err) {
        setError('Could not load the technical bench. Please try again later.'); // More user-friendly error
      } finally {
        setLoading(false);
      }
    };

    fetchBench();
     }, []);
  
  // Apply filters to the players list
  const filteredMembers = members.filter(member => {
    let isMatch = true;
    // Team filter
    if (filters.team && member.team !== filters.team) {
      isMatch = false;
    }

     return isMatch;
  });

  const uTeamManager = filteredMembers.filter((member) => member.role === "Team Manager")
  const uheadCoach = filteredMembers.filter((member) => member.role === "Head Coach")
  const otherMembers = filteredMembers.filter((member) => member.role !== "Head Coach" && member.role !=="Team Manager")
  
  
  if (loading) return (
    <div className=" flex flex-col justify-center items-center min-h-96">
        <PropagateLoader
          color="#f20f0f"
          size={19}
          speedMultiplier={2}
        />
    </div>
  ); 
  if (error) return <p>Error: {error}</p>;
  
  
  
  return (
    <>
      <h1 className={`${bebas_neue.className} text-5xl text-red-600 font-extrabold py-2 uppercase`}>technical bench</h1>
      {/* Filter by Teams */}
      <select
        value={filters.team}
        onChange={e => setFilters({ ...filters, team: e.target.value })}
        className="border border-gray-300 rounded-lg p-2 mb-4"
        >
          <option value="stars">Ulinzi stars</option>
          <option value="starlets">Ulinzi Starlets</option>
          <option value="youths">Ulinzi Youths</option>
      </select>
   <section className="grid grid-cols-1 md:flex md:justify-between lg:gap-20  items-start justify-start">
      <div className="flex flex-col md:w-1/2">
        <p className="uppercase text-2xl font-semibold text-blue-900 my-2">Team Manager</p>
        <article className="grid grid-cols-1 md:grid-cols-1 gap-1 justify-between md:w-full">
          {uTeamManager.map((member) => (
            <Card className=" text-[13px] p-1 md:max-w-[320px] bg-white hover:translate-y-1">
              <CardContent className="p-0 flex flex-col items-center">
                <div className=" rounded-lg ">
                  <div className="bg-white px-10">
                    <Image src={member?.image} alt={member.name} width={500} height={1000}
                    />
                  </div>
                  <p className="font-bold uppercase m-2 text-red-600 text-2xl">{member.name}</p>
                  <div className="flex  justify-center mt-1">
                    <p className=" text-blue-900 font-bold">{member.role}</p>
                  </div>
                </div>
              </CardContent>
              <div className=" text-slate-500 flex justify-between px-2 py-0 items-baseline">
                <pre className={` ${inter.className} whitespace-pre-wrap max-h-[100px] overflow-y-scroll`}>{member.description}</pre>
              </div>
            </Card>
          ))
          }
          </article>
          <p className="uppercase text-2xl font-semibold text-blue-900 my-2">Head Coach</p>
        <article className="grid grid-cols-1 md:grid-cols-1 gap-1 justify-between md:w-full">
          {uheadCoach.map((member) => (
            <Card className=" text-[13px] p-1 md:max-w-[320px] bg-white hover:translate-y-1">
              <CardContent className="p-0 flex flex-col items-center">
                <div className=" rounded-lg ">
                  <div className="bg-white px-10">
                    <Image src={member?.image} alt={member.name} width={500} height={1000}
                    />
                  </div>
                  <p className="font-bold uppercase m-2 text-red-600 text-2xl">{member.name}</p>
                  <div className="flex  justify-center mt-1">
                    <p className=" text-blue-900 font-bold">{member.role}</p>
                  </div>
                </div>
              </CardContent>
              <div className=" text-slate-500 flex justify-between px-2 py-0 items-baseline">
                <pre className={` ${inter.className} whitespace-pre-wrap max-h-[100px] overflow-y-scroll`}>{member.description}</pre>
              </div>
            </Card>
          ))
          }
        </article>
        </div>
        <div className="flex lg:min-w-fit  items-start bg-white p-2 rounded-lg">
        <article className="grid grid-cols-1 md:grid-cols-3 gap-14 justify-between md:w-full">
          {otherMembers?.map((member) => (
            <Card className=" text-[13px] p-1 md:max-w-[220px] md:min-w-[170px] bg-white hover:translate-y-1">
              <CardContent className="p-0 flex flex-col items-center">
                <div className=" rounded-lg ">
                  <div className="bg-white px-10">
                    <Image src={member?.image} alt={member.name} width={400} height={800}
                      className="min-w-[80px] min-h-[80px]"
                    />
                  </div>
                  <p className="font-bold uppercase m-2 text-red-600 text-xs">{member.name}</p>
                  <div className="flex  justify-center mt-1">
                    <p className=" text-blue-900 font-bold">{member.role}</p>
                  </div>
                </div>
              </CardContent>
              <div className=" text-slate-500 flex justify-between px-2 py-0 items-baseline">
                <pre className={` ${inter.className} whitespace-pre-wrap max-h-[100px] overflow-y-scroll`}>{member.description}</pre>
              </div>
            </Card>
          ))
          }
        </article>
        </div>
      </ section>
      </>
    )
}