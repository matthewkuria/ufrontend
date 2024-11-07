// pages/dashboard.js
"use client";
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import MatchCard from '../components/MatchCard';
import NewsCard from '../components/NewsCard';
import { useEffect, useState } from 'react';
import defaultAvatar from "../../public/images/defaultuser.png"

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isShown, setIshown] = useState(false)
  const [userProfile, setUserProfile] = useState({ email: '' });
  const [matches, setMatches] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter()


  useEffect(() => {
    const token = Cookies.get('access_token');

    if (!token) {
      // Redirect to login if there is no access token
      router.push('/login');
    } else {
     // Decode token or make API call to verify role
  fetch('http://localhost:8000/api/accounts/user-profile/', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,  // Token obtained after login
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => {
  // Handle data
  // console.log(data)
 setUserProfile({
    fan: data.fan,
    email: data.email,
 });
  setLoading(false)
})
.catch(error => {
  console.error('Error fetching profile', error);
});

    }
        
  }, []);

  useEffect(() => {
    
    const fetchMatches = async () => {
      try {
        const matchesResponse = await fetch('http://localhost:8000/api/matches/'); // Replace with your matches API
        const matchesData = await matchesResponse.json();
        setMatches(matchesData);
      } catch (err) {
        console.error('Error fetching matches:', err);
      }
    };

    const fetchLatestNews = async () => {
      try {
        const newsResponse = await fetch('http://localhost:8000/api/news/'); // Replace with your news API
        const newsData = await newsResponse.json();
        setLatestNews(newsData);
      } catch (err) {
        console.error('Error fetching news:', err);
      }
    };

    Promise.all([ fetchMatches(), fetchLatestNews()])
      .then(() => setLoading(false))
      .catch(err => {
        setError('Failed to load data');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
function handleClick() {
     setIshown(prevState => !prevState)
  }
  return (
    <>
      <Head>
        <title>{userProfile.fan? userProfile.fan.full_name:"New Fan"}'s Dashboard</title>
        <meta name="description" content="Fan dashboard for personalized content." />
      </Head>
      <main className='p-8'>
        <div className="flex relative justify-end text-xs">
        <div  className="">
        <h1>Welcome, {userProfile.fan ? userProfile.fan.full_name : "New Fan"}!</h1>
          <h5 className="text-xs font-semibold text-slate-300">{userProfile.email}</h5>
          <p className="font-bold text-red-500 animate-pulse">{userProfile.fan ? "": "Click on My details"}</p>

        </div>
        <Image src={defaultAvatar} alt="NCMI User Avatar" width={60} height={60} onClick={handleClick}/>
      {isShown &&
          <div className="absolute top-16 right-0 bg-slate-200 rounded-md p-4">  
            <div className="">
              <h4 className="">{userProfile.member? userProfile.fan.full_name:"Member"}</h4>
              <h5 className="text-xs font-semibold">{userProfile.email}</h5>
        </div>  
            <div className=" py-5">
              <Link href="/" >
                <button className="text-red-500 hover:text-blue-500 px-2 rounded-sm font-bold hover:font-semibold">
                  {userProfile.member ? "Update  details": ""}
                </button>
              </Link>
              <Link href="/fan-dashboard/my-details" >
                <button className="text-red-500 hover:text-blue-500 px-2 rounded-sm font-bold hover:font-semibold">
                  {userProfile.member ? "": "Join other fans"}
                </button>
              </Link>
            </div>
            <button className="flex  w-full grow items-center justify-center rounded-md text-sm font-medium  md:flex-none md:justify-start md:p-2 md:px-0">            
            <div className="block">              
                <Link href="/logout" className="flex hover:text-red-500">
                  Log Out
                </Link>
            </div>
          </button>
        </div>
       }
      </div>

        <section className="upcoming-matches">
          <h2>Your Upcoming Matches</h2>
          <div className="match-list">
            {matches.length > 0 ? (
              matches.map(match => (
                <MatchCard key={match.id} match={match} />
              ))
            ) : (
              <p>No upcoming matches found.</p>
            )}
          </div>
        </section>

        <section className="latest-news">
          <h2>Latest News</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.length > 0 ? (
              latestNews.map(news => (
                <NewsCard key={news.id} news={news} />
              ))
            ) : (
              <p>No latest news available.</p>
            )}
          </div>
        </section>
      </main>
      <style jsx>{`
        .upcoming-matches, .latest-news {
          margin: 2rem 0;
        }
        
      `}</style>
    </>
  );
};

export default Dashboard;
