"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import { Card, CardContent, CardHeader } from "../ui/components/ui/card";

export default function Players() {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   // State to hold filter values 
  const [filters, setFilters] = useState({
    team: "", // Default filter for team
   
  });

     useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/players/'); // Adjust to your API endpoint
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
  const uplayers = players.filter((player) => player.team === "stars")
  // Apply filters to the players list
  const filteredPlayers = players.filter(player => {
    let isMatch = true;

    // Team filter
    if (filters.team && player.team !== filters.team) {
      isMatch = false;
    }

     return isMatch;
  });
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
      {/* Filter by Teams */}
        <select
          onChange={e => setFilters({ ...filters, team: e.target.value })}
          className="border border-gray-300 rounded-lg p-2 mb-4"
        >
          <option value="">All Teams</option>
          <option value="stars">Ulinzi stars</option>
          <option value="starlets">Starlets</option>
          <option value="youths">Youths</option>
      </select>
      <section className="grid grid-cols-1 md:grid-cols-6 gap-2">
        {filteredPlayers.map((player) => (
          <Card className=" text-[13px] p-1 max-w-[320px] bg-white">
            <CardHeader>
              <p className="font-bold uppercase">{player.name}</p>
            </CardHeader>
            <CardContent className="p-0">
              <div className=" rounded-lg ">
                <div className="bg-slate-200 px-10">
                  <Image src={player?.image} alt={player.name} width={500} height={1000}
                  />
                </div>
                <div className="flex  justify-center mt-1">
                  <p className=" text-blue-900 font-bold">{player.position}</p>
                </div>
              </div>
            </CardContent>
            <div className=" text-slate-500 flex justify-between px-2 py-0 items-baseline">
              <p className="">{player.status}</p>
              <p className="text-black">{player.age}yrs</p>
            </div>
          </Card>
        ))
        }
      </section>
      </>
    )
}