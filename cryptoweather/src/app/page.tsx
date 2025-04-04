"use client";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";


export default function Home() {

  const [prices, setPrices] = useState<{ btc: number; eth: number }>({ btc: 0, eth: 0 });

  useEffect(() => {
    const socket = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin,ethereum,dogecoin,solana,cardano");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.bitcoin || data.ethereum) {
        setPrices((prev) => {
          const btcChange = Math.abs(prev.btc - (data.bitcoin || prev.btc));
          const ethChange = Math.abs(prev.eth - (data.ethereum || prev.eth));

          if (btcChange > 100) toast(`🚀 BTC price moved: $${data.bitcoin}`);
          if (ethChange > 10) toast(`🚀 ETH price moved: $${data.ethereum}`);

          return { btc: data.bitcoin || prev.btc, eth: data.ethereum || prev.eth };
        });
      }
    };


    const weatherInterval = setInterval(() => {
      const weatherAlerts = ["Storm Warning", "Heavy Rain", "Clear Skies", "Extreme Heat"];
      const randomAlert = weatherAlerts[Math.floor(Math.random() * weatherAlerts.length)];

      toast(`⛅ Weather Alert: ${randomAlert}`, { duration: 5000 });
    }, 15000);

    return () => {
      socket.close();
      clearInterval(weatherInterval);
    };
  }, []);

  return (
   <>


    

   

    
   <div className="main">


   <div className="header">

   <div className="dashboard">

     <h2>Dashboard</h2>

     <ul className="content">
       <li><a href="/weather">Weather </a></li>
       <li><a href="/Crypto">Crypto </a></li>
       <li><a href="/news">News Updates</a></li>
     </ul>

   </div>

   <div className="dashboard">

     <h2>Details</h2>

     <ul className="content">
       <li><a href="/weatherdetails">City details</a></li>
       <li><a href="/cryptodetails">Crypto details</a></li>
      


     </ul>
   </div>

  </div>

</div >

<div className="p-12 m-25 max-w-lg mx-auto text-center bg-red-50 rounded-4xl ">
      <h1 className="text-2xl font-bold">Live BTC , ETH & otherPrices</h1>
      <p className="mt-4">BTC: <strong>${prices.btc}</strong></p>
      <p className="mt-2">ETH: <strong>${prices.eth}</strong></p>

      
    </div>

<div className="m-25 p-10 border-1 rounded-2xl">



  <p>This web application allows users to fetch real-time weather details of any city and track live cryptocurrency prices with just a few clicks.</p>
   
   
  <h1 className="font-bold">🌤️ Weather Details</h1>

   <ul className="list-disc p-2 m-7">

    <li>
    Track real-time prices of popular cryptocurrencies like Bitcoin, Ethereum, and more.


    </li>
    <li>
    Search for any cryptocurrency by name to get live price, market cap, and 24-hour changes.

    </li>
    <li>

    Data is fetched from CoinCap API to ensure fast and reliable updates

    </li>
   </ul>

   <h1 className="font-bold">💰 Cryptocurrency Tracker</h1>

   <ul className="list-disc p-2 m-7">

    <li>
    Enter a city name to get current weather conditions, including temperature, humidity, and weather status.


    </li>
    <li>
    View the past 5 days' weather history to analyze trends.

    </li>
    <li>

    Powered by OpenWeatherMap API for accurate and up-to-date information.

    </li>
   </ul>

   <h1 className="font-bold">Real-Time Notifications </h1>

<ul className="list-disc p-2 m-7">

 <li>
 Establish a WebSocket connection to receive price changes for BTC/ETH.


 </li>
 <li>
 Display notifications (toast or dropdown) for significant price shifts or simulated weather alerts.


 </li>
 <li>

 Shows the live prices of the some crypto

 </li>
</ul>
</div>
   </>
  );
}
