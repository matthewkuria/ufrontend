"use client";
import { BounceLoader } from 'react-spinners';
import MatchCard from '../components/MatchCard';
import { useEffect, useState } from 'react';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/matches/'); // Adjust to your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch matches');
        }
        const data = await response.json();
        setMatches(data);
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
    <>
     
      <main className='p-4'>
        <h1 className='text-xl font-bold text-blue-900 m-4'>Upcoming Matches</h1>
        <section className="matches-list flex">
          {matches.length > 0 ? (
            matches.map(match => (
              <MatchCard key={match.id} match={match} />
            ))
          ) : (
            <p>No matches found.</p>
          )}
        </section>
      </main>
      <style jsx>{`
        .matches-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
      `}</style>
    </>
  );
};

export default Matches;
