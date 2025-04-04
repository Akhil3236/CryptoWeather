
export default function Home() {
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

</div>
   </>
  );
}
