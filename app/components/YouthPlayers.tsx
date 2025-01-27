"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import { Card, CardContent, CardHeader } from "../ui/components/ui/card";
import { bebas_neue, new_rocker } from "../fonts/fonts";

export default function Players() {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   // State to hold filter values 
  const [filters, setFilters] = useState({
    team: "youths", // Default filter for team
   
  });

     useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/players/`); // Adjust to your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch players');
        }
        const data = await response.json();
        setPlayers(data);
        console.log(data)
      } catch (err) {
        setError('Could not load players. Please try again later.'); // More user-friendly error
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
     }, []);
  
  // Apply filters to the players list
  const filteredPlayers = players.filter(player => {
    let isMatch = true;
    // Team filter
    if (filters.team && player.team !== filters.team) {
      isMatch = false;
    }

     return isMatch;
  });

  const uplayers = filteredPlayers.filter((player) => player.team === "stars")
  const ustarsgoalers = filteredPlayers.filter((player) => player.role === "GoalKeeper")
  const ustarsdefenders = filteredPlayers.filter((player) => player.role ==="Defender")
  const ustarsmid = filteredPlayers.filter((player) => player.role ==="Midfielder")
  const ustarsforwards = filteredPlayers.filter((player) => player.role ==="Forwards")
  const ustarsonloan = filteredPlayers.filter((player) => player.role ==="On_loan")
  
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
      <h1 className={`${bebas_neue.className} text-5xl text-red-600 font-extrabold py-2`}>TEAMS</h1>
      {/* Filter by Teams */}
      <select
        value={filters.team}
        onChange={e => setFilters({ ...filters, team: e.target.value })}
        className="border border-gray-300 rounded-lg p-2 mb-4"
        >
          <option value="stars">Ulinzi stars</option>
          <option value="starlets">Starlets</option>
          <option value="youths">Youths</option>
      </select>

      <p className="uppercase text-2xl font-semibold text-blue-900 my-2">goal keepers</p>
      <article className="grid grid-cols-1 md:grid-cols-3 gap-1 justify-between md:w-2/3">
        {ustarsgoalers.map((player) => (
          <Card className=" text-[13px] p-1 md:max-w-[220px] bg-white hover:translate-y-1">
            <CardContent className="p-0">
              <div className=" rounded-lg ">
                <div className="bg-slate-200 px-10">
                  <Image src={player?.image} alt={player.sur_name} width={400} height={800}
                    className="min-w-[80px] min-h-[80px]"
                  />
                </div>
                <div className="flex  justify-between">
                  <div className="flex flex-col  justify-center mt-1 font-bold">
                    <p className="text-slate-500">{player.first_name}</p>
                    <p className={`${bebas_neue.className} text-3xl text-black`}>{player.sur_name}</p>
                    <p className=" text-blue-900 font-bold">{player.role}</p>
                  </div>
                  <div className="">
                    <p className={`${new_rocker.className} text-[#392d80] text-4xl`}>{player.jersey_number}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <div className=" text-slate-500 flex justify-between  py-0 items-baseline">
              <p className="">{player.status}</p>
              <p className="font-bold">{player.position}</p>
            </div>
          </Card>
        ))
        }
      </article>
      <p className="uppercase text-2xl font-semibold text-blue-900 my-2">Defenders</p>
      <article className="grid grid-cols-1 md:grid-cols-3 gap-2 justify-between md:w-2/3">
        {ustarsdefenders.map((player) => (
          <Card className=" text-[13px] p-1 md:max-w-[220px] bg-white hover:translate-y-1">
            <CardContent className="p-0">
              <div className=" rounded-lg ">
                <div className="bg-slate-200 px-10">
                  <Image src={player?.image} alt={player.sur_name} width={400} height={800}
                    className="min-w-[80px] min-h-[80px]"
                  />
                </div>
                <div className="flex  justify-between">
                  <div className="flex flex-col  justify-center mt-1 font-bold">
                    <p className="text-slate-500">{player.first_name}</p>
                    <p className={`${bebas_neue.className} text-3xl text-black`}>{player.sur_name}</p>
                    <p className=" text-blue-900 font-bold">{player.role}</p>
                  </div>
                  <div className="">
                    <p className={`${new_rocker.className} text-[#392d80] text-4xl`}>{player.jersey_number}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <div className=" text-slate-500 flex justify-between  py-0 items-baseline">
              <p className="">{player.status}</p>
              <p className="font-bold">{player.position}</p>
            </div>
          </Card>
        ))
        }
      </article>
      <p className="uppercase text-2xl font-semibold text-blue-900 my-2">Mid Fielders</p>
      <article className="grid grid-cols-1 md:grid-cols-3 gap-2 justify-between md:w-2/3">
        {ustarsmid.map((player) => (
          <Card className=" text-[13px] p-1 md:max-w-[220px] bg-white hover:translate-y-1">
            <CardContent className="p-0">
              <div className=" rounded-lg ">
                <div className="bg-slate-200 px-10">
                  <Image src={player?.image} alt={player.sur_name} width={400} height={800}
                    className="min-w-[80px] min-h-[80px]"
                  />
                </div>
                <div className="flex  justify-between">
                  <div className="flex flex-col  justify-center mt-1 font-bold">
                    <p className="text-slate-500">{player.first_name}</p>
                    <p className={`${bebas_neue.className} text-3xl text-black`}>{player.sur_name}</p>
                    <p className=" text-blue-900 font-bold">{player.role}</p>
                  </div>
                  <div className="">
                    <p className={`${new_rocker.className} text-[#392d80] text-4xl`}>{player.jersey_number}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <div className=" text-slate-500 flex justify-between  py-0 items-baseline">
              <p className="">{player.status}</p>
              <p className="font-bold">{player.position}</p>
            </div>
          </Card>
        ))
        }
      </article>
      <p className="uppercase text-2xl font-semibold text-blue-900 my-2">forwards</p>
      <article className="grid grid-cols-1 md:grid-cols-3 gap-2 md:w-2/3">
        {ustarsforwards.map((player) => (
          <Card className=" text-[13px] p-1 md:max-w-[220px] bg-white hover:translate-y-1">
            <CardContent className="p-0">
              <div className=" rounded-lg ">
                <div className="bg-slate-200 px-10">
                  <Image src={player?.image} alt={player.sur_name} width={400} height={800}
                    className="min-w-[80px] min-h-[80px]"
                  />
                </div>
                <div className="flex  justify-between">
                  <div className="flex flex-col  justify-center mt-1 font-bold">
                    <p className="text-slate-500">{player.first_name}</p>
                    <p className={`${bebas_neue.className} text-3xl text-black`}>{player.sur_name}</p>
                    <p className=" text-blue-900 font-bold">{player.role}</p>
                  </div>
                  <div className="">
                    <p className={`${new_rocker.className} text-[#392d80] text-4xl`}>{player.jersey_number}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <div className=" text-slate-500 flex justify-between  py-0 items-baseline">
              <p className="">{player.status}</p>
              <p className="font-bold">{player.position}</p>
            </div>
          </Card>
        ))
        }
      </article>
      <p className="uppercase text-2xl font-semibold text-blue-900 my-2">on loan</p>
      <article className="grid grid-cols-1 md:grid-cols-3 gap-2 md:w-2/3">
        {ustarsonloan.map((player) => (
          <Card className=" text-[13px] p-1 md:max-w-[220px] bg-white hover:translate-y-1">
            <CardContent className="p-0">
              <div className=" rounded-lg ">
                <div className="bg-slate-200 px-10">
                  <Image src={player?.image} alt={player.sur_name} width={400} height={800}
                    className="min-w-[80px] min-h-[80px]"
                  />
                </div>
                <div className="flex  justify-between">
                  <div className="flex flex-col  justify-center mt-1 font-bold">
                    <p className="text-slate-500">{player.first_name}</p>
                    <p className={`${bebas_neue.className} text-3xl text-black`}>{player.sur_name}</p>
                    <p className=" text-blue-900 font-bold">{player.role}</p>
                  </div>
                  <div className="">
                    <p className={`${new_rocker.className} text-[#392d80] text-4xl`}>{player.jersey_number}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <div className=" text-slate-500 flex justify-between  py-0 items-baseline">
              <p className="">{player.status}</p>
              <p className="font-bold">{player.position}</p>
            </div>
          </Card>
        ))
        }
      </article>
      </>
    )
}