'use client'
import "./globals.css";
import FinalLayout from "../../components/layout/integreatedLayout"
import { SessionProvider } from "next-auth/react";
import RouteGuard from "../../components/RouteGuard";
import { SocketProvider } from "../../components/sockeioContext"
import { useEffect, useState } from "react";
import { tokenState } from "../../lib/stateManagement/tokenState";
import { useAtom } from "jotai";


export default function RootLayout({ children }) {
  const [token,setToken]=useAtom(tokenState);
 
  return (
    <html lang="en">
      <body className="min-h-screen">
        <RouteGuard>
          <SessionProvider>
            <SocketProvider token={token}>
              <FinalLayout/>
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
