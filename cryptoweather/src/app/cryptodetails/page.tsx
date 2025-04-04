
"use client";
import { useState } from "react";

export default function CryptoHistory() {
  const [crypto, setCrypto] = useState("");
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [history, setHistory] = useState<{ date: string; price: number }[]>([]);
  const [error, setError] = useState("");

  const fetchCryptoHistory = async () => {
    if (!crypto.trim()) {
      setError("Enter a cryptocurrency name.");
      return;
    }

    setError("");
    setCurrentPrice(null);
    setHistory([]);

    try {
     
      const res = await fetch(`https://api.coincap.io/v2/assets/${crypto.toLowerCase()}`);
      const data = await res.json();

      if (!data.data) {
        setError("Cryptocurrency not found.");
        return;
      }

      setCurrentPrice(parseFloat(data.data.priceUsd));

     
      const historyRes = await fetch(`https://api.coincap.io/v2/assets/${crypto.toLowerCase()}/history?interval=d1`);
      const historyData = await historyRes.json();

      console.log(historyData);
      
      if (historyData.data) {
        const formattedHistory = historyData.data.slice(-20).map((entry: any) => ({
          date: new Date(entry.time).toISOString().split("T")[0], 
          price: parseFloat(entry.priceUsd),
        }));
        setHistory(formattedHistory);
      }
    } catch {
      setError("Error fetching data.");
    }
  };

  return (
    <div className="p-10 m-20 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold">Crypto Price History</h1>
      <input
        type="text"
        value={crypto}
        onChange={(e) => setCrypto(e.target.value)}
        placeholder="Enter Crypto Name (e.g., bitcoin)"
        className="p-2 border rounded w-full mt-4"
      />
      <button onClick={fetchCryptoHistory} className="mt-2 bg-blue-500 text-white p-2 rounded w-full">
        Get Data
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {currentPrice !== null && (
          <h2 className="mt-4 text-xl">Current Price: ${currentPrice.toFixed(2)}</h2>
        )}

        <h1>Data of last 30 days :</h1>
      {history.length > 0 && (
        <table className="mt-4 w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Date</th>
              <th className="border p-2">Price (USD)</th>
            </tr>
          </thead>
          <tbody>
            {history.map((day, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{day.date}</td>
                <td className="border p-2">${day.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
