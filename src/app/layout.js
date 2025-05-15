"use client";
import "./globals.css";
import FinalLayout from "../../components/layout/integreatedLayout";
import { SessionProvider } from "next-auth/react";
import RouteGuard from "../../components/RouteGuard";
import { SocketProvider } from "../../components/sockeioContext";
import { UnreadMessageProvider } from "../../components/unreadMessagContext";

export default function RootLayout({ children }) {
 

  return (
    <html lang="en">
      <body className="min-h-screen">
        <RouteGuard>
          <SessionProvider>
            <SocketProvider >
              <UnreadMessageProvider>
                <FinalLayout />
                <div className="h-svh bg-white">{children}</div>
              </UnreadMessageProvider>
            </SocketProvider>
          </SessionProvider>
        </RouteGuard>
      </body>
    </html>
  );
}
