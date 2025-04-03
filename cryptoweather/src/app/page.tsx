import { Outlet } from "react-router-dom";
export default function Home({ children }: { children: React.ReactNode }) {
  return (
   <>
   
   <div className="main">


   <div className="header">

      <div className="dashboard">

        <h2>Dashboard</h2>

        <ul className="content">
          <li><a href="/weather">Weather </a></li>
          <li><a href="/Crypto">Crypto </a></li>
          <li><a href="">News Updates</a></li>
        </ul>

      </div>

      <div className="dashboard">

        <h2>Details</h2>

        <ul className="content">
          <li><a href="">City details</a></li>
          <li><a href="">Crypto details</a></li>
        </ul>
      </div>

   </div>

   </div>

   {children}

    
   

   </>
  );
}
