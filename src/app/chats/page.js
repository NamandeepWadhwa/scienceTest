"use client"
"use strict"
import { useEffect } from "react";
import { useSocket } from "../../../components/sockeioContext";

export default function Page() {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    console.log("I AM HERE");

    return () => {
      socket.off("message"); // Clean up
    };
  }, [socket]);

  return <div>Check console for socket events.</div>;
}
