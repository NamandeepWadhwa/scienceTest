'use client'
import "./globals.css";
import SideBar from "../../components/layout/sideBar";
import SideBarMd from "../../components/layout/sideBarMD";
import { SessionProvider } from "next-auth/react";
import RouteGuard from "../../components/RouteGuard";
import { SocketProvider } from "../../components/sockeioContext"
import { useEffect, useState } from "react";


export default function RootLayout({ children }) {
  const [token,setToken]=useState(null);
  useEffect(()=>{
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }

  },[])
  return (
    <html lang="en">
      <body className="min-h-screen">
        <RouteGuard>
          <SessionProvider>
            <SocketProvider token={token}>
              <div className="sticky top-0 w-full flex justify-center bg-navbar z-50 h-14">
                <SideBarMd />
                <SideBar />
              </div>
              {/* Main content should take up remaining space */}
              <div className=" h-svh bg-white ">{children}</div>
              {/* Footer stays at the bottom */}
            </SocketProvider>
            
          </SessionProvider>
        </RouteGuard>
      </body>
    </html>
  );
}
