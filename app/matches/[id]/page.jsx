'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BounceLoader } from 'react-spinners';

export default function MatchDetailsPage({ params }) {
  const { id } = params;
  const [matchDetails, setMatchDetails] = useState(null);

  useEffect(() => {
    async function fetchMatchDetails() {
      try {
        const response = await fetch(`http://localhost:8000/api/matches/${id}/`);
        const data = await response.json();
        setMatchDetails(data);
      } catch (error) {
        console.error('Error fetching match details:', error);
      }
    }

    if (id) {
      fetchMatchDetails();
    }
  }, [id]);

  // Loading indicator while data is being fetched
  if (!matchDetails) return <BounceLoader color='red' speedMultiplier={3} />;

  return (
    <div className="match-details text-xs">
      <div className="border border-b-2">
        <h1 className='text-2xl font-bold'>
            {matchDetails?.home_team?.name} vs {matchDetails?.away_team?.name}
            </h1>
            <div className="grid  grid-cols-1 md:grid-cols-3 justify-center items-center">
                <div className="flex flex-col items-center">
                    <img src={matchDetails?.home_team?.logo} alt={matchDetails?.home_team?.name} className="team-logo" />
                    <p className="text-3xl">VS</p>
                    <img src={matchDetails?.away_team?.logo} alt={matchDetails?.away_team?.name} className="team-logo" />
                </div>
            <div className="  font-bold text-slate-600">
                <p>Date: {matchDetails?.match_date}</p>
            <p className='text-red-600 font-bold text-xl'>Scores:</p>
                <p className="text-xl text-blue-700">{matchDetails?.home_team?.name} - {matchDetails?.away_team?.name}</p>
                <p className="text-red-600 font-bold text-xl">{matchDetails?.home_score} - {matchDetails?.away_score}</p>
                <p>League:{ matchDetails.league?.name? matchDetails.league.name :"Friendly Match"}</p>
            </div>
            {/* Match Highlights */}
            <div className="highlights flex flex-col items-center">
            <h2 className='text-base font-semibold'>Match Highlights</h2>
            <ul>
                {matchDetails?.match_highlights?.map((highlight, index) => (
                <li key={index} className='animate-bounce fill-mode-both text-blue-800'>{highlight.minute}': {highlight.event}</li>
                ))}
            </ul>
            </div>
        </div>
            
      </div>

    {/* Lineups */}
    <h2 className='text-xl font-bold text-red-600  underline'>Lineups</h2>
      <div className="lineups grid grid-cols-1 md:grid-cols-2 items-start gap-5">
        <div className='flex flex-col'>
        <p className='text-xl font-bold text-blue-900'>{matchDetails?.home_team?.name}</p>
        <ul>
            {matchDetails?.lineups
            ?.filter((lineup) => lineup.team.id === matchDetails.home_team.id)
            .map((player, index) => (
                <div className="flex gap-3 items-center" key={index}>
                <li className="">{player.player_name}</li>
                <li className="">{player.position}</li>
                </div>
            ))}
        </ul>
        </div>
        <div className='flex flex-col'>
        <p className='text-xl font-bold'>{matchDetails?.away_team?.name}</p>
        <ul>
            {matchDetails?.lineups
            ?.filter((lineup) => lineup.team.id === matchDetails.away_team.id)
            .map((player, index) => (
                <div className="flex gap-3" key={index}>
                <li className="">{player.player_name}</li>
                <li className="">{player.position}</li>
                </div>
            ))}
        </ul>
        </div>
      </div>     

      {/* Team Standings */}
      <div className="team-standings">
        <p className='text-xl font-bold'>Team Standings</p>
        <div>
            <h3>{matchDetails?.home_team?.name}</h3>
            {matchDetails?.team_standings
                ?.find((standing) => standing.team.id === matchDetails.home_team.id) && (
                <>
                    <p>
                    Rank: {matchDetails.team_standings.find(
                        (standing) => standing.team.id === matchDetails.home_team.id
                    )?.rank}
                    </p>
                    <p>
                    Points: {matchDetails.team_standings.find(
                        (standing) => standing.team.id === matchDetails.home_team.id
                    )?.points}
                    </p>
                </>
            )}
        </div>

        <div>
            <h3>{matchDetails?.away_team?.name}</h3>
            {matchDetails?.team_standings
                ?.find((standing) => standing.team.id === matchDetails.away_team.id) && (
                <>
                    <p>
                    Rank: {matchDetails.team_standings.find(
                        (standing) => standing.team.id === matchDetails.home_team.id
                    )?.rank}
                    </p>
                    <p>
                    Points: {matchDetails.team_standings.find(
                        (standing) => standing.team.id === matchDetails.home_team.id
                    )?.points}
                    </p>
                </>
            )}
        </div>
      </div>

      <style jsx>{`
        .match-details {
          padding: 1rem;
          text-align: center;
        }
        .team-logo {
          width: 80px;
          height: 80px;
          object-fit: contain;
          margin: 0.5rem;
        }
       
        .lineups, .highlights, .team-standings {
          margin: 2rem 0;
          text-align: left;
        }
        
      `}</style>
    </div>
  );
}
