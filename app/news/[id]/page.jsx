export async function generateStaticParams() {
  const response = await fetch('http://localhost:8000/api/news/');
  const newsItems = await response.json();

  return newsItems.map((item) => ({
    id: item.id.toString(), // Ensure ID is a string
  }));
}


// This function fetches the news item for the page.
export async function getNewsItem(id) {
  const response = await fetch(`http://localhost:8000/api/news/${id}/`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Failed to fetch news item');
  }
  return response.json();
}

export default async function NewsDetailsPage({ params }) {
  console.log("Received ID:", params.id); // Log the received ID
  const { id } = params; // Get the dynamic route parameter

  const newsItem = await getNewsItem(id); // Fetch the news item data

  // Render the news details
  return (
    <div className="flex flex-col justify-center items-center p-4 md:p-8  w-full">
      <h1 className="text-2xl font-bold">{newsItem.title}</h1>
      <img src={newsItem.image} alt={newsItem.title} className="mt-4 w-full md:w-1/2  h-1/2" />
      <div className="mt-4  p-3">
      <p className="border-l-2 p-2 text-slate-500">{newsItem.content}</p>
      </div>
      <div className="">
        <p className="text-yellow-600 underline">{ newsItem.tags.length> 0 ? `Tags:${newsItem.tags}` :""}</p>
      </div>
    </div>
  );
}
