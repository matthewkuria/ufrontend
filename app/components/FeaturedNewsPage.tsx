'use client';
import Link from 'next/link';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function FeaturedNewsPage() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const formatDateTime = (dateString) => {
  try {
    // Preprocess the date string to remove the `-` and ensure a parsable format
    const cleanedDateString = dateString.replace(' - ', ' ');
    const date = new Date(cleanedDateString);

    // Format the Date object
    return format(date, `MMMM dd, yyyy`);
  } catch (error) {
    console.error('Error formatting date:', dateString, error);
    return 'Invalid Date';
  }
};

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/`, { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setNewsItems(data);
        console.log(data)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []); // Empty dependency array means this runs only once after the initial render
 const featuredNews = newsItems.filter((item) => item.is_featured)
 const moreNews = newsItems.filter((item) => !item.is_featured)
  if (loading) return <Skeleton count={20} />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">Featured News</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredNews.map((item) => (
          <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <Link href={`/news/${item.id}`}>
              <img
                src={item.image}  // Ensure the API returns an image_url field
                alt={item.title}
                className="w-full h-48 object-cover cursor-pointer hover:scale-105"
              />
            </Link>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-700">{item.summary}</p>
              <p className="">{item.tags.length> 0 ? `Tags:${item.tags}` :""}</p>
              <div className="flex justify-between items-baseline">
                <Link href={`/news/${item.id}`}>
                <p className="text-indigo-600 hover:underline">Read More</p>
                </Link>
                <p className="text-slate-500 text-xs">{formatDateTime(item.published_date)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
     
    </div>
  );
}
