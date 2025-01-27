"use client";
import { BounceLoader } from 'react-spinners';
import MatchCard from '../components/MatchCard';
import ResultCard from '../components/ResultCard'
import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { bebas_neue} from '../fonts/fonts';
import TeamStandingsTable from '../components/TeamStandingTable';

const Matches = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/`); // Adjust to your API endpoint
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
        <h1 className={`${bebas_neue.className} text-4xl font-bold text-[#392d80] m-4 uppercase`}>Matches</h1>
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList className="text-blue-900 font-bold">
            <Tab>Fixtures</Tab>
            <Tab>Results</Tab>
            <Tab>Tables</Tab>
            <Tab>Stats</Tab>
          </TabList>
          <TabPanel>
              <article className="matches-list flex flex-col gap-4">
                {matches.length > 0 ? (
                  matches.map(match => (
                    <MatchCard key={match.id} match={match} />
                  ))
                ) : (
                  <p>No matches at the moment.</p>
                )}
              </article>
          </TabPanel>
          <TabPanel>
            <article className=''>
              {matches.length > 0 ? (
                matches.map(match => (
                  <ResultCard key={match.id} match={match} />
                ))
              ): (
                  <p className="">No results found</p>
             )}
            </article>
          </TabPanel>
          <TabPanel>
            <TeamStandingsTable />
          </TabPanel>
        </Tabs>
      
      </main>
      
    </>
  );
};

export default Matches;
