"use client";
import { useState, useEffect } from "react";

const popularCryptos = ["bitcoin", "ethereum", "dogecoin", "cardano"];

export default function CryptoPrices() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [prices, setPrices] = useState<{ [key: string]:any }>({});

  const fetchPrices = async () => {

    try {
      // const ids = popularCryptos.join(",");
      const res = await fetch(`https://api.coincap.io/v2/assets`);
      const data = await res.json();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const filteredData = data.data.filter((coin: any) =>
        popularCryptos.includes(coin.id)
      );

      setPrices(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        filteredData.reduce((acc: any, coin: any) => {
          acc[coin.id] = coin;
          return acc;
        }, {})
      );
    } catch (error) {
      console.error("Error fetching crypto prices:", error);
    }
  };

  useEffect(() => {
    fetchPrices(); 
    const interval = setInterval(fetchPrices, 60000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="p-2 m-20">
    

      <h1 className="text-2xl font-bold">Live Crypto Prices</h1>

     
      <div>

      {Object.keys(prices).length > 0 ? (
        <div className="flex-row">
          <div>
            {popularCryptos.map((coin) => (
              <ul key={coin} className="border-2 p-10 m-3 rounded-3xl  flex-col justify-center  grid grid-cols-3 ">
                <li className=""> Name :
                  {prices[coin]?.name} ({prices[coin]?.symbol.toUpperCase()})
                </li>
                <li className=""> Price :${parseFloat(prices[coin]?.priceUsd || 0).toFixed(2)}</li>
                <li className=""> Marketcap : ${(parseFloat(prices[coin]?.marketCapUsd || 0) / 1e9).toFixed(2)}B</li>
                <li
                  className={`${
                    parseFloat(prices[coin]?.changePercent24Hr) >= 0
                    ? "text-green-600"
                    : "text-red-600"
                  }`}
                  >
                 P/L (in 24 hours): {parseFloat(prices[coin]?.changePercent24Hr || 0).toFixed(2)}%
                </li>
              </ul>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading prices...</p>
      )}
      </div>
    </div>
  );
}
