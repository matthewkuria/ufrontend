"use client";
import { BounceLoader } from 'react-spinners';
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/components/ui/table";


const TeamStandingsTable = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/`);
        if (!response.ok) {
          throw new Error('Failed to fetch matches');
        }
        const data = await response.json();
        setMatches(data);
        console.log(data)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <BounceLoader />;
  if (error) return <p>Error: {error}</p>;
 

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Team Standings</h1>
      <Table>
        <TableHeader>
          <TableRow className='font-bold'>
            <TableHead>Rank</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>MP</TableHead>
            <TableHead>W</TableHead>
            <TableHead>D</TableHead>
            <TableHead>L</TableHead>
            <TableHead>GF</TableHead>
            <TableHead>GD</TableHead>
            <TableHead>Pts</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches?.team_standings?.map((team) => (
            <TableRow key={team.rank}>
              <TableCell>{team.rank}</TableCell>
              <TableCell>{team.team}</TableCell>
              <TableCell>{team.games_played}</TableCell>
              <TableCell>{team.wins}</TableCell>
              <TableCell>{team.draws}</TableCell>
              <TableCell>{team.losses}</TableCell>
              <TableCell>{team.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TeamStandingsTable;
