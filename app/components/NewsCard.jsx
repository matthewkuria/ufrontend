import Link from "next/link";
const NewsCard = ({ news }) => {
    return (
        <section className="">
            <div key={news.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <Link href={`/news/${news.id}`}>
                    <img
                    src={news.image}  // Ensure the API returns an image_url field
                    alt={news.title}
                    className="w-full h-48 object-cover cursor-pointer"
                    />
                </Link>
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{news.title}</h2>
                    <p className="text-gray-700">{news.summary}</p>
                    <p className="">{news.tags.length> 0 ? `Tags:${news.tags}` :""}</p>
                    <div className="flex justify-between newss-baseline">
                    <Link href={`/news/${news.id}`}>
                    <p className="text-indigo-600 hover:underline">Read More</p>
                    </Link>
                    <p className="text-slate-500 text-xs">{news.published_date}</p>
                    </div>
                </div>
            </div>
        </section>
    )
    
}
export default NewsCard;