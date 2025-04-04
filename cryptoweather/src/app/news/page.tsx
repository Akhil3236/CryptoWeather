"use client";
import { useState, useEffect } from "react";

export default function CryptoNews() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [news, setNews] = useState<any[]>([]);
  const API_KEY = process.env.NEXT_PUBLIC_NEWSDATA_API_KEY;

  useEffect(() => {

  const fetchNews = async () => {
    try {
      const res = await fetch(
        `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=crypto&language=en`
      );
      const data = await res.json();
      setNews(data.results || []);
    } catch (error) {
      console.error("Error fetching crypto news:", error);
    }
  };

  
    fetchNews();
    const interval = setInterval(fetchNews, 600000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div className="p-10 m-20">
      <h1 className="text-2xl font-bold" >Latest Crypto News</h1>
      {news.length > 0 ? (
        <div className="mt-4 space-y-4">
          {news.map((article, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">{article.title}</h2>
              <p className="text-sm text-gray-500">{article.pubDate}</p>
              <p className="mt-2">{article.description}</p>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline mt-2 block"
              >
                Read More
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading news...</p>
      )}
    </div>
  );
}
